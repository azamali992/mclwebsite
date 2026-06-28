import { useEffect } from 'react';

const SITE_NAME = 'Multan Chemicals Limited';
const SITE_URL = 'https://mcl-gases.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Upserts a `<meta>` tag in `document.head`, matched by `name` or `property`,
 * and returns a cleanup function that removes only the tag this call created
 * (tags that already existed before mount are left alone and just have their
 * content restored).
 */
function upsertMeta({ name, property, content }) {
  if (!content) return () => {};
  const attr = name ? 'name' : 'property';
  const attrValue = name || property;
  let el = document.head.querySelector(`meta[${attr}="${attrValue}"]`);
  const existed = !!el;
  const previousContent = el?.getAttribute('content');

  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);

  return () => {
    if (!existed) {
      el.remove();
    } else if (previousContent != null) {
      el.setAttribute('content', previousContent);
    }
  };
}

/** Upserts `<link rel="canonical">`, returns a cleanup function. */
function upsertCanonical(href) {
  if (!href) return () => {};
  let el = document.head.querySelector('link[rel="canonical"]');
  const existed = !!el;
  const previousHref = el?.getAttribute('href');

  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);

  return () => {
    if (!existed) {
      el.remove();
    } else if (previousHref != null) {
      el.setAttribute('href', previousHref);
    }
  };
}

/** Appends a `<script type="application/ld+json">` block, returns a cleanup function. */
function appendJsonLd(data, key) {
  if (!data) return () => {};
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.dataset.seoJsonld = key || 'default';
  // JSON.stringify on a controlled, in-memory JS object — never raw string
  // concatenation of CMS/user-controlled text, so this is safe even though
  // some of the values it stringifies may ultimately trace back to
  // admin-editable Content/Stat records.
  el.textContent = JSON.stringify(data);
  document.head.appendChild(el);
  return () => el.remove();
}

/**
 * Per-page document head manager for this Vite SPA (no react-helmet-async,
 * no SSR). Sets `document.title`, the meta description, canonical link,
 * Open Graph + Twitter Card tags, and optionally injects one or more
 * JSON-LD `<script>` blocks. All changes are undone on unmount/route change
 * so the next page's `<Seo>` starts from a clean slate.
 *
 * @param {string} title - Page title (without the site-name suffix; this
 *   component appends " | Multan Chemicals Limited" unless `noSuffix` is set).
 * @param {string} description - Meta description, ~150-160 chars ideal.
 * @param {string} [path] - Route path used to build the canonical/og:url
 *   (e.g. "/gases" or "/gases/industrial-gases/oxygen"). Defaults to the
 *   current `window.location.pathname`.
 * @param {string} [image] - Absolute or root-relative OG/Twitter image URL.
 *   Falls back to the site-wide default share image.
 * @param {'website'|'article'|'product'} [type] - og:type.
 * @param {object|object[]} [jsonLd] - One JSON-LD object, or an array of
 *   them (e.g. Organization + BreadcrumbList on the same page), each
 *   rendered as its own `<script type="application/ld+json">`.
 * @param {boolean} [noindex] - Adds `<meta name="robots" content="noindex,nofollow">`.
 */
export default function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  jsonLd,
  noSuffix = false,
  noindex = false,
}) {
  useEffect(() => {
    const cleanups = [];
    const fullTitle = noSuffix || !title ? title || SITE_NAME : `${title} | ${SITE_NAME}`;
    const previousTitle = document.title;
    if (fullTitle) document.title = fullTitle;

    const url = `${SITE_URL}${path ?? window.location.pathname}`;
    const ogImage = image
      ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
      : DEFAULT_OG_IMAGE;

    if (description) cleanups.push(upsertMeta({ name: 'description', content: description }));
    cleanups.push(upsertCanonical(url));

    cleanups.push(upsertMeta({ property: 'og:title', content: fullTitle }));
    if (description) cleanups.push(upsertMeta({ property: 'og:description', content: description }));
    cleanups.push(upsertMeta({ property: 'og:type', content: type }));
    cleanups.push(upsertMeta({ property: 'og:url', content: url }));
    cleanups.push(upsertMeta({ property: 'og:image', content: ogImage }));
    cleanups.push(upsertMeta({ property: 'og:site_name', content: SITE_NAME }));

    cleanups.push(upsertMeta({ name: 'twitter:card', content: 'summary_large_image' }));
    cleanups.push(upsertMeta({ name: 'twitter:title', content: fullTitle }));
    if (description) cleanups.push(upsertMeta({ name: 'twitter:description', content: description }));
    cleanups.push(upsertMeta({ name: 'twitter:image', content: ogImage }));

    if (noindex) {
      cleanups.push(upsertMeta({ name: 'robots', content: 'noindex, nofollow' }));
    }

    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      blocks.forEach((block, i) => cleanups.push(appendJsonLd(block, `seo-${i}`)));
    }

    return () => {
      document.title = previousTitle;
      cleanups.forEach((fn) => fn());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, noSuffix, noindex, JSON.stringify(jsonLd)]);

  return null;
}

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE };
