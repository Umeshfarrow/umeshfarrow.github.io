const pages = [
  'sections/home.html',
  'sections/about.html',
  'sections/contact.html'
];

let currentPageIndex = 0;
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
let isLoading = false;

function loadPage(index) {
  if (index < 0 || index >= pages.length) return;

  isLoading = true;
  const pageContainer = document.getElementById('page-content');

  pageContainer.classList.add('fade-out');

  setTimeout(() => {
    fetch(pages[index])
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        pageContainer.innerHTML = tempDiv.innerHTML;

        if (typeof window.initializeContactIcons === 'function') {
          window.initializeContactIcons();
        }

        pageContainer.classList.remove('fade-out');
        pageContainer.classList.add('fade-in');

        setTimeout(() => {
          pageContainer.classList.remove('fade-in');
          isLoading = false;
        }, 300);
      })
      .catch(err => {
        console.error('Failed to load page:', err);
        isLoading = false;
      });
  }, 300);
}

window.addEventListener('scroll', () => {
  if (isLoading) return;

  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const scrollingDown = currentScroll > lastScrollTop;
  const scrollingUp = currentScroll < lastScrollTop;

  const nearBottom = window.innerHeight + currentScroll >= document.body.offsetHeight - 50;
  const nearTop = currentScroll <= 50;

  if (scrollingDown && nearBottom && currentPageIndex < pages.length - 1) {
    currentPageIndex++;
    loadPage(currentPageIndex);
  }

  if (scrollingUp && nearTop && currentPageIndex > 0) {
    currentPageIndex--;
    loadPage(currentPageIndex);
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetPage = link.dataset.target;

    const index = pages.findIndex(p => p.includes(targetPage));
    if (index !== -1 && !isLoading) {
      currentPageIndex = index;
      loadPage(currentPageIndex);
      window.scrollTo(0, 0);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  loadPage(currentPageIndex);
});
