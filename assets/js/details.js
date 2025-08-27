function initDetails() {
  // Clear and restart typing effect
  const roleText = "Senior DevOps Engineer";
  const typingEl = document.getElementById("typing-role");
  if (!typingEl) return; // in case element is missing on some pages

  typingEl.textContent = ''; // reset before typing
  let i = 0;

  function typeWriter() {
    if (i < roleText.length) {
      typingEl.textContent += roleText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();

  // Fade-in on scroll using IntersectionObserver
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

  // Observe all sections and footer
  document.querySelectorAll('section, footer').forEach(el => observer.observe(el));
}

// Run once on initial page load
document.addEventListener("DOMContentLoaded", initDetails);
