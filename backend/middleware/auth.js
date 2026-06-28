import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // TODO(security, Medium, deferred Phase 6): this trusts the JWT payload
    // without re-checking the Admin document. A deactivated admin
    // (isActive: false) or one deleted after the token was issued keeps
    // full write access for the rest of the token's 7-day lifetime, since
    // nothing here re-queries the database. Fix: look up
    // Admin.findById(decoded.id).select('isActive') and reject if missing
    // or inactive. Deferred because it adds a DB round-trip to every
    // authenticated request — worth doing alongside a wider look at
    // token revocation (e.g. a short-lived access token + refresh token)
    // rather than as an isolated patch.
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

export default authMiddleware;
