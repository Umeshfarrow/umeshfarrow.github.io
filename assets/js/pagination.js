export function initHorizontalPagination({wrapperId, totalItems, paginationId}) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;

  let currentPage = 0;

  // Remove existing pagination if re-entering route
  document.getElementById(paginationId)?.remove();

  const pagination = document.createElement('div');
  pagination.id = paginationId;
  pagination.className = 'pagination modern-pagination';
  wrapper.after(pagination);

  function renderPagination() {
    pagination.innerHTML = `
      <div class="page-indicator">
        ${Array.from({length: totalItems}).map((_, i) => `
          <span class="dot ${i === currentPage ? 'active' : ''}" data-index="${i}"></span>
        `).join('')}
      </div>
    `;

    // Click dots to scroll
    pagination.querySelectorAll('.dot').forEach(dot => {
      dot.onclick = () => {
        const index = parseInt(dot.dataset.index, 10);
        currentPage = index;
        wrapper.scrollTo({
          left: wrapper.clientWidth * currentPage,
          behavior: 'smooth'
        });
        renderPagination();
      };
    });
  }

  // Sync pagination when user scrolls manually
  wrapper.addEventListener('scroll', () => {
    const index = Math.round(wrapper.scrollLeft / wrapper.clientWidth);
    if (index !== currentPage) {
      currentPage = index;
      renderPagination();
    }
  });

  renderPagination();
}
