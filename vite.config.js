import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Content-Security-Policy applied ONLY to the production build.
// The dev server must keep working (Vite HMR uses inline/eval + websockets),
// so the CSP meta tag is injected via transformIndexHtml with apply: "build".
const pagesCsp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  // frame-ancestors is NOT honored when delivered via a <meta> element
  // (header-only directive) — omitted on purpose to avoid the console warning.
  "base-uri 'self'",
  "form-action 'none'",
  "upgrade-insecure-requests",
].join("; ");

function injectCsp() {
  return {
    name: "inject-csp",
    apply: "build",
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "meta",
            attrs: {
              "http-equiv": "Content-Security-Policy",
              content: pagesCsp,
            },
            injectTo: "head-prepend",
          },
        ],
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), injectCsp()],
  base: "/",

  server: {
    host: true,

    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});