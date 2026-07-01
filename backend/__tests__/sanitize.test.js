import { describe, it, expect } from 'vitest';
import { clean } from '../middleware/sanitize.js';

describe('clean — primitive pass-through', () => {
  it('returns strings unchanged', () => {
    expect(clean('hello')).toBe('hello');
    expect(clean('$safe-in-value')).toBe('$safe-in-value');
  });

  it('returns numbers unchanged', () => {
    expect(clean(42)).toBe(42);
  });

  it('returns booleans unchanged', () => {
    expect(clean(true)).toBe(true);
    expect(clean(false)).toBe(false);
  });

  it('returns null unchanged', () => {
    expect(clean(null)).toBe(null);
  });

  it('returns undefined unchanged', () => {
    expect(clean(undefined)).toBe(undefined);
  });
});

describe('clean — object sanitisation', () => {
  it('passes a safe flat object through unchanged', () => {
    expect(clean({ name: 'Alice', age: 30 })).toEqual({ name: 'Alice', age: 30 });
  });

  it('strips a $-prefixed operator key', () => {
    const result = clean({ $gt: 0, name: 'Alice' });
    expect(result).not.toHaveProperty('$gt');
    expect(result).toEqual({ name: 'Alice' });
  });

  it('strips a key containing a dot', () => {
    const result = clean({ 'nested.key': 'value', name: 'Alice' });
    expect(result).not.toHaveProperty('nested.key');
    expect(result).toEqual({ name: 'Alice' });
  });

  it('strips $where injection attempt', () => {
    const result = clean({ $where: 'this.admin === true', safe: 'ok' });
    expect(result).not.toHaveProperty('$where');
    expect(result.safe).toBe('ok');
  });

  it('strips $ne injection attempt', () => {
    const result = clean({ status: { $ne: null } });
    // The inner $ne is inside a nested object — it should be stripped too
    expect(result.status).not.toHaveProperty('$ne');
    expect(result.status).toEqual({});
  });

  it('keeps a $ that appears in a value (not a key)', () => {
    expect(clean({ price: 'USD $100' })).toEqual({ price: 'USD $100' });
  });

  it('recursively cleans nested objects', () => {
    const payload = {
      outer: {
        inner: {
          $nin: ['admin'],
          legit: 'data',
        },
      },
    };
    const result = clean(payload);
    expect(result.outer.inner).not.toHaveProperty('$nin');
    expect(result.outer.inner).toEqual({ legit: 'data' });
  });
});

describe('clean — array sanitisation', () => {
  it('maps over an array, cleaning each element', () => {
    const result = clean([{ $in: [] }, { name: 'Alice' }]);
    expect(result[0]).toEqual({});
    expect(result[1]).toEqual({ name: 'Alice' });
  });

  it('handles an array of primitives unchanged', () => {
    expect(clean([1, 'two', true, null])).toEqual([1, 'two', true, null]);
  });

  it('recursively cleans nested arrays', () => {
    const result = clean([[{ $gt: 5 }, 'safe']]);
    expect(result[0][0]).toEqual({});
    expect(result[0][1]).toBe('safe');
  });
});
