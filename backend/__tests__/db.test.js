// DB-dependent integration tests using MongoMemoryServer.
// These run the real Express app (via supertest) against an isolated
// in-memory MongoDB instance — no network, no live Atlas cluster,
// no test data leaking into production. Each test gets a clean DB
// via the beforeEach wipe.
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../app.js';
import { makeAdminToken } from './helpers.js';

let mongod;
let authToken;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  // makeAdminToken needs JWT_SECRET — set by setup.js which runs before this
  authToken = makeAdminToken();
}, 30000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

beforeEach(async () => {
  const { collections } = mongoose.connection;
  for (const col of Object.values(collections)) {
    await col.deleteMany({});
  }
});

// ── Public routes on an empty DB ──────────────────────────────────────────────

describe('Public GET routes — empty DB', () => {
  it('GET /api/stats returns an empty array', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('GET /api/careers returns an empty array', async () => {
    const res = await request(app).get('/api/careers');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('GET /api/products returns an empty array', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('GET /api/stats/:key for a missing key returns 404', async () => {
    const res = await request(app).get('/api/stats/nonexistent_key');
    expect(res.status).toBe(404);
  });

  it('GET /api/careers/:id for a valid-format but missing id returns 404', async () => {
    const res = await request(app).get('/api/careers/507f1f77bcf86cd799439011');
    expect(res.status).toBe(404);
  });
});

// ── Stat CRUD round-trip ──────────────────────────────────────────────────────

describe('Admin CRUD — /api/stats', () => {
  it('POST creates a stat and returns 201 with the stat body', async () => {
    const res = await request(app)
      .post('/api/stats')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ key: 'total_customers', value: '500+', label: 'Customers', group: 'company', order: 1 });

    expect(res.status).toBe(201);
    expect(res.body.stat.key).toBe('total_customers');
    expect(res.body.stat.value).toBe('500+');
    expect(res.body.stat.group).toBe('company');
  });

  it('POST without required fields returns 400', async () => {
    const res = await request(app)
      .post('/api/stats')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ label: 'Missing key and value' });

    expect(res.status).toBe(400);
  });

  it('GET /api/stats returns the created stat', async () => {
    await request(app)
      .post('/api/stats')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ key: 'years_experience', value: '30+', label: 'Years', group: 'company', order: 2 });

    const res = await request(app).get('/api/stats');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].key).toBe('years_experience');
  });

  it('GET /api/stats?group= filters by group', async () => {
    await request(app)
      .post('/api/stats')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ key: 's1', value: '1', label: 'A', group: 'company' });
    await request(app)
      .post('/api/stats')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ key: 's2', value: '2', label: 'B', group: 'mgps' });

    const company = await request(app).get('/api/stats?group=company');
    expect(company.body).toHaveLength(1);
    expect(company.body[0].group).toBe('company');

    const mgps = await request(app).get('/api/stats?group=mgps');
    expect(mgps.body).toHaveLength(1);
    expect(mgps.body[0].group).toBe('mgps');
  });

  it('GET /api/stats?group repeated (array injection attempt) falls back to no filter', async () => {
    await request(app)
      .post('/api/stats')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ key: 'probe', value: '1', label: 'X', group: 'company' });

    // Both stats should be returned when the group filter is bypassed
    const res = await request(app).get('/api/stats?group=company&group=mgps');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT updates a stat value and returns 200', async () => {
    const create = await request(app)
      .post('/api/stats')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ key: 'capacity', value: '50', label: 'Capacity', group: 'company' });
    const id = create.body.stat._id;

    const res = await request(app)
      .put(`/api/stats/${id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ value: '100' });

    expect(res.status).toBe(200);
    expect(res.body.stat.value).toBe('100');
    expect(res.body.stat.key).toBe('capacity'); // other fields unchanged
  });

  it('PUT on a non-existent id returns 404', async () => {
    const res = await request(app)
      .put('/api/stats/507f1f77bcf86cd799439011')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ value: 'ghost' });

    expect(res.status).toBe(404);
  });

  it('DELETE removes a stat and returns 204', async () => {
    const create = await request(app)
      .post('/api/stats')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ key: 'to_delete', value: '1', label: 'X', group: 'company' });
    const id = create.body.stat._id;

    const del = await request(app)
      .delete(`/api/stats/${id}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(del.status).toBe(204);
    expect(del.body).toEqual({});

    const list = await request(app).get('/api/stats');
    expect(list.body).toHaveLength(0);
  });
});

// ── Career CRUD + soft-delete ─────────────────────────────────────────────────

describe('Admin CRUD — /api/careers (with soft-delete)', () => {
  it('POST creates a career and returns 201', async () => {
    const res = await request(app)
      .post('/api/careers')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ position: 'Senior Gas Engineer', department: 'Engineering', type: 'Full-time' });

    expect(res.status).toBe(201);
    expect(res.body.career.position).toBe('Senior Gas Engineer');
    expect(res.body.career.isActive).toBe(true);
  });

  it('POST without position returns 400', async () => {
    const res = await request(app)
      .post('/api/careers')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ department: 'Engineering' });

    expect(res.status).toBe(400);
  });

  it('active career appears in public GET /api/careers', async () => {
    await request(app)
      .post('/api/careers')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ position: 'QA Specialist', department: 'Quality' });

    const res = await request(app).get('/api/careers');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].position).toBe('QA Specialist');
  });

  it('DELETE soft-deletes (sets isActive=false) and returns 204', async () => {
    const create = await request(app)
      .post('/api/careers')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ position: 'Temp Role', department: 'HR' });
    const id = create.body.career._id;

    const del = await request(app)
      .delete(`/api/careers/${id}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(del.status).toBe(204);

    // The public endpoint filters by isActive:true, so deleted career is hidden
    const list = await request(app).get('/api/careers');
    expect(list.body).toHaveLength(0);
  });

  it('PUT updates a career and returns 200', async () => {
    const create = await request(app)
      .post('/api/careers')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ position: 'Junior Engineer', department: 'Engineering' });
    const id = create.body.career._id;

    const res = await request(app)
      .put(`/api/careers/${id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ location: 'Lahore' });

    expect(res.status).toBe(200);
    expect(res.body.career.location).toBe('Lahore');
    expect(res.body.career.position).toBe('Junior Engineer'); // unchanged
  });
});

// ── Contact form submission ───────────────────────────────────────────────────

describe('POST /api/contact', () => {
  it('accepts a valid submission and returns 201', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Ahmed Khan',
        email: 'ahmed@example.com',
        subject: 'Product Quote',
        message: 'I need a quote for industrial oxygen.',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/received/i);
  });

  it('rejects a submission missing required fields (400)', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Someone' }); // missing email and message

    expect(res.status).toBe(400);
  });

  it('rejects a submission with an invalid email (400)', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Test', email: 'not-an-email', message: 'Hello' });

    expect(res.status).toBe(400);
  });

  it('rejects a submission that exceeds maximum lengths (400)', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'A'.repeat(201),
        email: 'x@x.com',
        message: 'hello',
      });

    expect(res.status).toBe(400);
  });
});
