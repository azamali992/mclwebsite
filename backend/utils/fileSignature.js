import fs from 'fs';

// Magic-byte signatures for every MIME type this app accepts uploads for.
// multer's `fileFilter` only checks the client-supplied `Content-Type`
// header, which a client fully controls — a malicious upload can claim
// `image/png` while actually being an `.html`/`.svg` file that
// `express.static` would later serve and a browser would render, enabling
// stored XSS. Verifying the file's real binary signature after it lands on
// disk closes that gap regardless of what header the client sent.
const SIGNATURES = {
  'image/jpeg': [[0xff, 0xd8, 0xff]],
  'image/png': [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  'image/gif': [[0x47, 0x49, 0x46, 0x38]],
  // WEBP: bytes 0-3 are "RIFF", bytes 8-11 are "WEBP" — checked separately below.
  'image/webp': [[0x52, 0x49, 0x46, 0x46]],
  'application/pdf': [[0x25, 0x50, 0x44, 0x46]],
  'application/msword': [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],
  // .docx (and .xlsx/.pptx) are all ZIP containers — same signature family.
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    [0x50, 0x4b, 0x03, 0x04],
    [0x50, 0x4b, 0x05, 0x06],
    [0x50, 0x4b, 0x07, 0x08],
  ],
};

function matchesBytes(buffer, signature) {
  return signature.every((byte, i) => buffer[i] === byte);
}

/**
 * Reads the first 12 bytes of `filePath` and verifies they match a known
 * magic-byte signature for `mimetype`. Returns false for any MIME type not
 * in `SIGNATURES` (treated as "cannot verify, reject"), so this only ever
 * narrows what's accepted, never silently widens it.
 */
export function verifyFileSignature(filePath, mimetype) {
  const signatures = SIGNATURES[mimetype];
  if (!signatures) return false;

  const buffer = Buffer.alloc(12);
  const fd = fs.openSync(filePath, 'r');
  try {
    fs.readSync(fd, buffer, 0, 12, 0);
  } finally {
    fs.closeSync(fd);
  }

  if (mimetype === 'image/webp') {
    return matchesBytes(buffer, [0x52, 0x49, 0x46, 0x46])
      && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;
  }

  return signatures.some((sig) => matchesBytes(buffer, sig));
}

export default verifyFileSignature;
