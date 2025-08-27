// 1. Details initializer
function initDetails() {
  const roleText = "Senior DevOps Engineer";
  const typingEl = document.getElementById("typing-role");
  if (!typingEl) return;

  typingEl.textContent = '';
  let i = 0;

  function typeWriter() {
    if (i < roleText.length) {
      typingEl.textContent += roleText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();

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

// 2. Contact icons initializer
function initContactIcons() {
  const contactItems = [
    {
      icon: 'fas fa-envelope',
      link: 'mailto:kelsakarya@gmail.com',
      title: 'Email'
    },
    {
      icon: 'fab fa-linkedin',
      link: 'https://linkedin.com/in/umeshfarrow',
      title: 'LinkedIn'
    },
    {
      icon: 'fab fa-github',
      link: 'https://github.com/umeshfarrow',
      title: 'GitHub'
    }
  ];

  const container = document.getElementById('contact-list');
  if (!container) return;

  container.innerHTML = '';
  contactItems.forEach(item => {
    const icon = document.createElement('i');
    icon.className = item.icon;
    icon.style.marginRight = '10px';
    icon.style.fontSize = '1.3rem';
    if (item.title) icon.title = item.title;

    const wrapper = document.createElement(item.link ? 'a' : 'span');
    if (item.link) {
      wrapper.href = item.link;
      wrapper.target = '_blank';
      wrapper.rel = 'noopener noreferrer';
    }
    wrapper.appendChild(icon);

    container.appendChild(wrapper);
  });
}

// 3. Router logic
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const pageContainer = document.getElementById('page-content');
  const container = document.querySelector('.container');

  const pages = ['sections/home.html', 'sections/about.html', 'sections/skills.html'];
  let currentIndex = 0;

  function loadPage(url) {
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

          pageContainer.classList.remove('fade-out');
          pageContainer.classList.add('fade-in');

          // ✅ Call initializers
          initDetails();
          initContactIcons();

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
