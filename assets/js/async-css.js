// async-css.js - load non-critical stylesheets (fonts) without blocking first paint
const asyncStylesheets = [
  'assets/css/fonts.css',
];

asyncStylesheets.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
});
