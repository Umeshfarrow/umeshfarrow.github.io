// async-css.js - load non-critical stylesheets (fonts, icon fonts) without blocking first paint
const asyncStylesheets = [
  'assets/css/fonts.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
];

asyncStylesheets.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
});
