// education.js
import { staggerIn } from './stagger.js';

export const education = [
  {
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science & Engineering",
    institution: "Visvesvaraya Technological University",
    location: "Belagavi, India",
    duration: "2015 – 2019",
  }
];

export const renderEducation = () => {
  const container = document.getElementById('education-container');
  if (!container) return;

  container.innerHTML = '';

  education.forEach(edu => {
    const card = document.createElement('div');
    card.className = 'education-item';
    card.innerHTML = `
      <h3 class="edu-degree">${edu.degree}</h3>
      <p class="edu-field">${edu.field}</p>
      <p class="edu-institution">${edu.institution} — ${edu.location}</p>
      <p class="edu-duration">${edu.duration}</p>
    `;
    container.appendChild(card);
  });

  staggerIn(container, { variant: 'up', stagger: 120 });
};
