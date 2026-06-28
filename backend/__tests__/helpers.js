import jwt from 'jsonwebtoken';

// A valid-shaped admin JWT for tests that need to exercise the
// "authenticated and authorized" path, not just the 401 rejection path.
export function makeAdminToken(overrides = {}) {
  return jwt.sign(
    { id: '507f1f77bcf86cd799439011', email: 'admin@test.com', role: 'admin', ...overrides },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}
