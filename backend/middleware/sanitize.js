// Strip MongoDB operator keys from request bodies to prevent NoSQL injection.
// Keys starting with "$" (e.g. {$gt:""}) or containing "." (dot-notation
// traversal) are removed before the body ever reaches a Mongoose query.
//
// Express 5 makes req.query a read-only getter, so this guard intentionally
// only sanitizes req.body — query and route params are always strings here and
// cannot carry operator objects.
function clean(value) {
  if (Array.isArray(value)) {
    return value.map(clean);
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, val] of Object.entries(value)) {
      if (key.startsWith('$') || key.includes('.')) continue;
      out[key] = clean(val);
    }
    return out;
  }
  return value;
}

export default function sanitizeBody(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = clean(req.body);
  }
  next();
}
