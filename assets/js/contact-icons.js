export function initContactIcons() {
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
    },
    {
      // icon: 'fa-solid fa-download',
      icon: 'fa-solid fa-file-arrow-down',
      link: 'assets/resume/Umesh_S_Resume.pdf',
      title: 'Download Resume'
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