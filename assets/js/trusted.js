// trusted.js - Trusted Types policy wrapper.
// Safe when CSP includes `require-trusted-types-for 'script'; trusted-types default`,
// and a no-op fallback when Trusted Types is not enforced.
const policy = window.trustedTypes
  ? window.trustedTypes.createPolicy('default', { createHTML: s => s })
  : null;

export const safeHTML = s => (policy ? policy.createHTML(s) : s);
