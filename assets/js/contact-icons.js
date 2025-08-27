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

  // Clear existing content before adding new icons
  container.innerHTML = '';

  contactItems.forEach(item => {
    const icon = document.createElement('i');
    icon.className = item.icon;
    icon.style.marginRight = '10px';
    icon.style.fontSize = '1.3rem';

    if (item.title) {
      icon.title = item.title;
    }

    let wrapper;
    if (item.link) {
      wrapper = document.createElement('a');
      wrapper.href = item.link;
      wrapper.target = '_blank';
      wrapper.rel = 'noopener noreferrer';
      wrapper.appendChild(icon);
    } else {
      wrapper = document.createElement('span');
      wrapper.appendChild(icon);
    }

    container.appendChild(wrapper);
  });
}

// Run once on initial page load
document.addEventListener('DOMContentLoaded', initContactIcons);
