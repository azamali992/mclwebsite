import { describe, it, expect, afterEach } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { verifyFileSignature } from '../utils/fileSignature.js';

// Track every temp file so afterEach can clean them up regardless of
// whether the test passed, failed, or threw.
const written = [];

function writeTmpWithBytes(bytes) {
  const p = path.join(
    os.tmpdir(),
    `mcl-sig-test-${Date.now()}-${Math.random().toString(36).slice(2)}.bin`,
  );
  // Always write exactly 12 bytes so readSync never gets less than expected.
  const buf = Buffer.alloc(12, 0);
  bytes.forEach((b, i) => { buf[i] = b; });
  fs.writeFileSync(p, buf);
  written.push(p);
  return p;
}

afterEach(() => {
  while (written.length) {
    const p = written.pop();
    try { fs.unlinkSync(p); } catch { /* already cleaned up */ }
  }
});

// ── Accepted types ────────────────────────────────────────────────────────────

describe('verifyFileSignature — accepted types', () => {
  it('accepts a JPEG (FF D8 FF)', () => {
    const f = writeTmpWithBytes([0xff, 0xd8, 0xff, 0xe0]);
    expect(verifyFileSignature(f, 'image/jpeg')).toBe(true);
  });

  it('accepts a PNG (89 50 4E 47 0D 0A 1A 0A)', () => {
    const f = writeTmpWithBytes([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(verifyFileSignature(f, 'image/png')).toBe(true);
  });

  it('accepts a GIF (47 49 46 38)', () => {
    const f = writeTmpWithBytes([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
    expect(verifyFileSignature(f, 'image/gif')).toBe(true);
  });

  it('accepts a WEBP (RIFF header + "WEBP" at offset 8)', () => {
    // bytes 0-3: "RIFF", bytes 4-7: arbitrary file-size, bytes 8-11: "WEBP"
    const f = writeTmpWithBytes([
      0x52, 0x49, 0x46, 0x46,   // RIFF
      0x00, 0x00, 0x00, 0x00,   // file size (unused by verifier)
      0x57, 0x45, 0x42, 0x50,   // WEBP
    ]);
    expect(verifyFileSignature(f, 'image/webp')).toBe(true);
  });

  it('accepts a PDF (%PDF)', () => {
    const f = writeTmpWithBytes([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31]);
    expect(verifyFileSignature(f, 'application/pdf')).toBe(true);
  });

  it('accepts a legacy .doc (D0 CF 11 E0 A1 B1 1A E1)', () => {
    const f = writeTmpWithBytes([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
    expect(verifyFileSignature(f, 'application/msword')).toBe(true);
  });

  it('accepts a .docx — ZIP variant PK 03 04', () => {
    const f = writeTmpWithBytes([0x50, 0x4b, 0x03, 0x04]);
    expect(verifyFileSignature(
      f,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    )).toBe(true);
  });

  it('accepts a .docx — ZIP variant PK 05 06 (empty archive)', () => {
    const f = writeTmpWithBytes([0x50, 0x4b, 0x05, 0x06]);
    expect(verifyFileSignature(
      f,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    )).toBe(true);
  });

  it('accepts a .docx — ZIP variant PK 07 08 (spanned archive)', () => {
    const f = writeTmpWithBytes([0x50, 0x4b, 0x07, 0x08]);
    expect(verifyFileSignature(
      f,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    )).toBe(true);
  });
});

// ── MIME-spoofing rejections ──────────────────────────────────────────────────

describe('verifyFileSignature — MIME spoofing rejected', () => {
  it('rejects PNG bytes claimed as image/jpeg', () => {
    const f = writeTmpWithBytes([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(verifyFileSignature(f, 'image/jpeg')).toBe(false);
  });

  it('rejects JPEG bytes claimed as image/png', () => {
    const f = writeTmpWithBytes([0xff, 0xd8, 0xff, 0xe0]);
    expect(verifyFileSignature(f, 'image/png')).toBe(false);
  });

  it('rejects a PDF claimed as image/jpeg — the key stored-XSS vector', () => {
    const f = writeTmpWithBytes([0x25, 0x50, 0x44, 0x46]);
    expect(verifyFileSignature(f, 'image/jpeg')).toBe(false);
  });

  it('rejects an HTML file claimed as image/png', () => {
    const p = path.join(os.tmpdir(), `mcl-sig-test-html-${Date.now()}.bin`);
    fs.writeFileSync(p, '<!DOCTYPE html><html><head></head><body>XSS</body></html>');
    written.push(p);
    expect(verifyFileSignature(p, 'image/png')).toBe(false);
  });

  it('rejects a JPEG claimed as application/pdf', () => {
    const f = writeTmpWithBytes([0xff, 0xd8, 0xff, 0xe0]);
    expect(verifyFileSignature(f, 'application/pdf')).toBe(false);
  });
});

// ── WEBP-specific rejections ──────────────────────────────────────────────────

describe('verifyFileSignature — WEBP edge cases', () => {
  it('rejects a RIFF file where bytes 8-11 are not "WEBP"', () => {
    // AVI is also a RIFF container — has RIFF at 0-3 but "AVI " at 8-11.
    const f = writeTmpWithBytes([
      0x52, 0x49, 0x46, 0x46,   // RIFF
      0x00, 0x00, 0x00, 0x00,
      0x41, 0x56, 0x49, 0x20,   // AVI (space), not WEBP
    ]);
    expect(verifyFileSignature(f, 'image/webp')).toBe(false);
  });

  it('rejects a file with correct WEBP FourCC but wrong RIFF header', () => {
    const f = writeTmpWithBytes([
      0x00, 0x00, 0x00, 0x00,   // wrong — not RIFF
      0x00, 0x00, 0x00, 0x00,
      0x57, 0x45, 0x42, 0x50,   // WEBP at right offset
    ]);
    expect(verifyFileSignature(f, 'image/webp')).toBe(false);
  });
});

// ── Unknown MIME types ────────────────────────────────────────────────────────

describe('verifyFileSignature — unknown MIME type always rejected', () => {
  it('rejects image/svg+xml even with plausible bytes', () => {
    const f = writeTmpWithBytes([0xff, 0xd8, 0xff]);
    expect(verifyFileSignature(f, 'image/svg+xml')).toBe(false);
  });

  it('rejects text/html', () => {
    const f = writeTmpWithBytes([0x3c, 0x21, 0x44, 0x4f]); // "<!DO"
    expect(verifyFileSignature(f, 'text/html')).toBe(false);
  });

  it('rejects application/octet-stream', () => {
    const f = writeTmpWithBytes([0xff, 0xd8, 0xff]);
    expect(verifyFileSignature(f, 'application/octet-stream')).toBe(false);
  });

  it('rejects an empty/null MIME string', () => {
    const f = writeTmpWithBytes([0xff, 0xd8, 0xff]);
    expect(verifyFileSignature(f, '')).toBe(false);
  });
});

// ── All-zero file ─────────────────────────────────────────────────────────────

describe('verifyFileSignature — zero-byte / garbage file', () => {
  it('rejects an all-zero file for every accepted image type', () => {
    const f = writeTmpWithBytes([]); // all 12 bytes stay 0x00
    expect(verifyFileSignature(f, 'image/jpeg')).toBe(false);
    expect(verifyFileSignature(f, 'image/png')).toBe(false);
    expect(verifyFileSignature(f, 'image/gif')).toBe(false);
    expect(verifyFileSignature(f, 'image/webp')).toBe(false);
    expect(verifyFileSignature(f, 'application/pdf')).toBe(false);
    expect(verifyFileSignature(f, 'application/msword')).toBe(false);
  });
});
