import { startTypingEffect } from './typing-effect.js';
import { initContactIcons } from './contact-icons.js';
import { renderSkills } from './skills.js';
import { renderExperience } from './experience.js';
import { renderProjects } from './projects.js';
import { renderCertifications } from './certifications.js';


// 1. Details initializer
function initDetails() {
  const designation = ["Senior DevOps Engineer"];
  const summary = ["I'm Senior DevOps Engineer with 6 years of experience designing and automating end-to-end software delivery pipelines across AWS, Azure, and hybrid cloud platforms. Proven expertise in building CI/CD pipelines (Jenkins, GitHub Actions, GitLab), integrating SonarQube for automated code quality checks, and deploying secure applications using Let’s Encrypt (TLS/HTTPS). Certified in Terraform with strong skills in Docker, Kubernetes, and GitOps practices to drive scalable, resilient infrastructure. Experienced in observability tools (Prometheus, Grafana, OpenTelemetry), enabling 99.9% uptime and reducing release cycles by up to 50%. Passionate about building future-ready infrastructure that is automated, secure, and cost-efficient."];

  const roleEl = document.getElementById('typing-role');
  if (roleEl) {
    startTypingEffect({ elementId: 'typing-role', texts: designation });
  }

  const summaryEl = document.getElementById('typing-summary');
  if (summaryEl) {
    startTypingEffect({ elementId: 'typing-summary', texts: summary, typingSpeed: 30 });
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('section, footer').forEach(el => observer.observe(el));
}

// 3. Router logic
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const pageContainer = document.getElementById('page-content');
  const container = document.querySelector('.container');

  const pages = ['sections/home.html', 'sections/about.html', 'sections/skills.html', 'sections/experience.html', 'sections/projects.html', 'sections/certifications.html'];
  let currentIndex = 0;

  function loadPage(url) {
    const dynamicBox = document.querySelector('.dynamic-box');
    const rotateClasses = [
      'rotate-about',
      'rotate-skills',
      'rotate-experience',
      'rotate-projects',
      'rotate-certifications'
      // 'rotate-education'
    ];

    pageContainer.classList.remove('fade-in', 'fade-out');
    pageContainer.classList.add('fade-out');

    setTimeout(() => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = data;

          const newContent = tempDiv.querySelector('#page-content');
          pageContainer.innerHTML = newContent ? newContent.innerHTML : data;

          // Remove previous rotations
          rotateClasses.forEach(cls => dynamicBox?.classList.remove(cls));

          // Add new rotate class based on current section
          if (url.includes('about.html')) dynamicBox?.classList.add('rotate-about');
          else if (url.includes('skills.html')) dynamicBox?.classList.add('rotate-skills');
          else if (url.includes('experience.html')) dynamicBox?.classList.add('rotate-experience');
          else if (url.includes('projects.html')) dynamicBox?.classList.add('rotate-projects');
          else if (url.includes('certifications.html')) dynamicBox?.classList.add('rotate-certifications');
          else if (url.includes('education.html')) dynamicBox?.classList.add('rotate-education');

          // Call relevant initializers
          if (url.includes('about.html')) initDetails();
          if (url.includes('skills.html')) renderSkills();
          if (url.includes('experience.html')) renderExperience();
          if (url.includes('projects.html')) renderProjects();
          if (url.includes('certifications.html')) renderCertifications();
          initContactIcons();

          // Animate fade-in
          pageContainer.classList.remove('fade-out');
          pageContainer.classList.add('fade-in');

          setTimeout(() => pageContainer.classList.remove('fade-in'), 300);
        })
        .catch(err => {
          console.error('Failed to load page:', err);
          pageContainer.classList.remove('fade-out');
        });
    }, 300);
  }


  // Initial page load
  loadPage(pages[currentIndex]);

  // Handle nav link clicks
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const url = link.getAttribute('data-target');
      const idx = pages.indexOf(url);
      if (idx !== -1 && idx !== currentIndex) {
        currentIndex = idx;
        loadPage(url);
      }
    });
  });

  // Scroll navigation inside container
  let isScrolling = false;

  container.addEventListener('wheel', e => {
    if (isScrolling) return;

    if (e.deltaY > 30 && currentIndex < pages.length - 1) {
      currentIndex++;
      isScrolling = true;
      loadPage(pages[currentIndex]);
      setTimeout(() => (isScrolling = false), 1000);
    } else if (e.deltaY < -30 && currentIndex > 0) {
      currentIndex--;
      isScrolling = true;
      loadPage(pages[currentIndex]);
      setTimeout(() => (isScrolling = false), 1000);
    }
  });
});
