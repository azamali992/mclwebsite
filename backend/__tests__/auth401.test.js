import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

// Every admin-protected route, verified by reading every route file directly
// (not assumed) — see CHANGES.md's Phase 1 Test Coverage Audit for the full
// table this was built from. This is the single highest-value test in the
// project: if `authMiddleware` is ever accidentally dropped from a route
// during a future refactor, this is what catches it before it ships.
const FAKE_ID = '507f1f77bcf86cd799439011';

const protectedRoutes = [
  ['post', '/api/auth/register'],
  ['get', '/api/auth/verify'],
  ['post', '/api/content'],
  ['put', `/api/content/${FAKE_ID}`],
  ['delete', `/api/content/${FAKE_ID}`],
  ['post', '/api/stats'],
  ['put', `/api/stats/${FAKE_ID}`],
  ['delete', `/api/stats/${FAKE_ID}`],
  ['post', '/api/products'],
  ['put', `/api/products/${FAKE_ID}`],
  ['delete', `/api/products/${FAKE_ID}`],
  ['post', '/api/careers'],
  ['put', `/api/careers/${FAKE_ID}`],
  ['delete', `/api/careers/${FAKE_ID}`],
  ['get', '/api/upload'],
  ['post', '/api/upload/upload'],
  ['delete', '/api/upload/somefile.png'],
  ['get', '/api/applications'],
  ['put', `/api/applications/${FAKE_ID}`],
  ['delete', `/api/applications/${FAKE_ID}`],
];

describe('Admin route auth guard', () => {
  it.each(protectedRoutes)('%s %s rejects a request with no token (401)', async (method, route) => {
    const res = await request(app)[method](route);
    expect(res.status).toBe(401);
  });

  it.each(protectedRoutes)('%s %s rejects an invalid/garbage token (401)', async (method, route) => {
    const res = await request(app)[method](route).set('Authorization', 'Bearer not-a-real-token');
    expect(res.status).toBe(401);
  });
});

describe('Public route stays public', () => {
  // Only /api/health is checked here — it's the one public route with zero
  // database dependency. The other public reads (content/stats/products/
  // careers) genuinely need a live MongoDB connection to verify end-to-end,
  // which this test run deliberately does not set up (see __tests__/setup.js).
  it('GET /api/health does not require auth', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
  });
});
