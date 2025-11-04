// style.js
const cssFiles = [
  "assets/css/variables.css",
  "assets/css/dynamic-box.css",
  "assets/css/base.css",
  "assets/css/profile.css",
  "assets/css/about.css",
  // "assets/css/transitions.css",
  "assets/css/skills.css",
  // "assets/css/experience.css",
  // "assets/css/certifications.css",
  // "assets/css/nav.css",
];

function loadStylesheets(files) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = file;
    document.head.appendChild(link);
  });
}

// Call the function to load CSS files
loadStylesheets(cssFiles);