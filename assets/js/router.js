import { startTypingEffect } from './typing-effect.js';
import { initContactIcons } from './contact-icons.js';
import { renderSkills } from './skills.js';
import { renderExperience } from './experience.js';
import { renderProjects } from './projects.js';
import { renderCertifications } from './certifications.js';
import { staggerIn } from './stagger.js';

const pages = ['sections/home.html', 'sections/about.html', 'sections/skills.html', 'sections/experience.html', 'sections/projects.html', 'sections/certifications.html'];

const rotateClasses = [
  'rotate-about', 'rotate-skills', 'rotate-experience',
  'rotate-projects', 'rotate-certifications'
];

let currentIndex = 0;
let isScrolling = false;
let isNavigating = false;

function initDetails() {
  const designation = ["Senior DevOps Engineer"];
  const summary = ["I'm Senior DevOps Engineer with 6 years of experience designing and automating end-to-end software delivery pipelines across AWS, Azure, and hybrid cloud platforms. Proven expertise in building CI/CD pipelines (Jenkins, GitHub Actions, GitLab), integrating SonarQube for automated code quality checks, and deploying secure applications using Let’s Encrypt (TLS/HTTPS). Certified in Terraform with strong skills in Docker, Kubernetes, and GitOps practices to drive scalable, resilient infrastructure. Experienced in observability tools (Prometheus, Grafana, OpenTelemetry), enabling 99.9% uptime and reducing release cycles by up to 50%. Passionate about building future-ready infrastructure that is automated, secure, and cost-efficient."];

  const roleEl = document.getElementById('typing-role');
  if (roleEl) startTypingEffect({ elementId: 'typing-role', texts: designation });

  const summaryEl = document.getElementById('typing-summary');
  if (summaryEl) startTypingEffect({ elementId: 'typing-summary', texts: summary, typingSpeed: 30 });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('section, footer').forEach(el => observer.observe(el));

  const profileLayout = document.querySelector('.profile-layout');
  if (profileLayout) staggerIn(profileLayout, { variant: 'scale-up', stagger: 100, initialDelay: 200 });
}

function loadPage(url) {
  if (isNavigating) return;
  isNavigating = true;

  const pageContainer = document.getElementById('page-content');
  const dynamicBox = document.querySelector('.dynamic-box');
  const loadingEl = document.getElementById('page-loading');

  if (loadingEl) loadingEl.style.display = 'flex';

  pageContainer.classList.remove('fade-in', 'fade-out');
  pageContainer.classList.add('fade-out');

  setTimeout(() => {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        pageContainer.innerHTML = data;

        rotateClasses.forEach(cls => dynamicBox?.classList.remove(cls));

        const file = url.split('/').pop().replace('.html', '');
        if (file !== 'home') dynamicBox?.classList.add('rotate-' + file);

        if (url.includes('about.html')) {
          initDetails();
          const about = document.querySelector('#about');
          if (about) staggerIn(about, { variant: 'up', stagger: 120, initialDelay: 100 });
        }
        if (url.includes('skills.html')) renderSkills();
        if (url.includes('experience.html')) renderExperience();
        if (url.includes('projects.html')) renderProjects();
        if (url.includes('certifications.html')) renderCertifications();
        initContactIcons();

        pageContainer.classList.remove('fade-out');
        pageContainer.classList.add('fade-in');
        if (loadingEl) loadingEl.style.display = 'none';

        setTimeout(() => {
          pageContainer.classList.remove('fade-in');
          isNavigating = false;
        }, 300);
      })
      .catch(err => {
        console.error('Failed to load page:', err);
        pageContainer.classList.remove('fade-out');
        if (loadingEl) loadingEl.style.display = 'none';
        isNavigating = false;
      });
  }, 300);
}

function goTo(index) {
  if (index < 0 || index >= pages.length || index === currentIndex) return;
  currentIndex = index;
  loadPage(pages[currentIndex]);
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');

  loadPage(pages[currentIndex]);

  container.addEventListener('wheel', e => {
    if (isScrolling || isNavigating) return;
    if (e.deltaY > 30 && currentIndex < pages.length - 1) {
      isScrolling = true;
      goTo(currentIndex + 1);
      setTimeout(() => isScrolling = false, 1000);
    } else if (e.deltaY < -30 && currentIndex > 0) {
      isScrolling = true;
      goTo(currentIndex - 1);
      setTimeout(() => isScrolling = false, 1000);
    }
  });

  container.addEventListener('keydown', e => {
    if (isNavigating) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(currentIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(currentIndex - 1);
    }
  });

  container.setAttribute('tabindex', '0');
});
