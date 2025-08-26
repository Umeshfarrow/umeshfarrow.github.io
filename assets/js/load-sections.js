// assets/js/load-sections.js

const sections = [
  "about",
  "skills",
  "experience",
  "projects",
  "certifications",
  "contact",
];

const content = document.getElementById("content");

sections.forEach(async (section) => {
  const response = await fetch(`sections/${section}.html`);
  const html = await response.text();
  const wrapper = document.createElement("section");
  wrapper.className = "section py-8";
  wrapper.innerHTML = html;
  content.appendChild(wrapper);
});
