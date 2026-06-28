// Strip MongoDB operator keys from request bodies to prevent NoSQL injection.
// Keys starting with "$" (e.g. {$gt:""}) or containing "." (dot-notation
// traversal) are removed before the body ever reaches a Mongoose query.
//
// Express 5 makes req.query a read-only getter, so this middleware cannot
// reassign or mutate it the way it mutates req.body — there is no
// app-wide place to sanitize query params. req.query CAN still produce a
// non-string value (repeated keys parse to an array), so every controller
// that builds a Mongoose filter from req.query (statController.getAllStats,
// applicationController.getAllApplications) explicitly checks
// `typeof x === 'string'` at the point of use instead of relying on this
// middleware to have already handled it.
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
