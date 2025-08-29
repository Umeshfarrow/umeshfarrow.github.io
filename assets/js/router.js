import { startTypingEffect } from './typing-effect.js';
import { initContactIcons } from './contact-icons.js';
import { renderCertifications } from './certifications.js';

// 1. Details initializer
function initDetails() {
  const designation = ["Senior DevOps Engineer"];
  const summary = ["A Senior DevOps Engineer, around 6 years of experience in designing, automating, and optimizing end-to-end software delivery pipelines across cloud, enterprise, and AI-driven platforms. Proven expertise in building CI/CD pipelines with Jenkins integrating SonarQube for automated code quality checks, and enabling secure application delivery with TLS/HTTPS using Let’s Encrypt. Skilled in deploying applications across multi-cloud (AWS/Azure/Orange Cloud), driving scalability, security, and cost optimization for diverse environments. Experienced in managing containerized applications with Docker and strong knowledge on Kubernetes, Terraform Certified, container orchestration practices to enable scalability and resilience. Adept at implementing GitOps workflows for streamlined deployments."];

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
    pageContainer.classList.add('fade-out');

    setTimeout(() => {
      fetch(url)
        .then(response => response.text())
        .then(data => {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = data;

          const newContent = tempDiv.querySelector('#page-content');
          if (newContent) {
            pageContainer.innerHTML = newContent.innerHTML;
          } else {
            pageContainer.innerHTML = data;
          }

          // ✅ Animate dynamic-box transition in both directions
          if (url.includes('about.html')) {
            dynamicBox?.classList.add('rotate-about');
          } else {
            dynamicBox?.classList.remove('rotate-about'); // ← reverse transition
          }

          if (url.includes('skills.html')) {
            dynamicBox?.classList.add('rotate-skills');
          } else {
            dynamicBox?.classList.remove('rotate-skills'); // ← reverse transition
          }

          if (url.includes('experience.html')) {
            dynamicBox?.classList.add('rotate-experience');
          } else {
            dynamicBox?.classList.remove('rotate-experience'); // ← reverse transition
          }

          if (url.includes('certifications.html')) {
            renderCertifications();  // Invoke renderCertifications on certs page load
            dynamicBox?.classList.add('rotate-certifications');
          } else {
            dynamicBox?.classList.remove('rotate-certifications'); // ← reverse transition
          }


          initDetails();
          initContactIcons();
          certifications();

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
