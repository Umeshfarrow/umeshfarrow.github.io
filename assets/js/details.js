document.addEventListener("DOMContentLoaded", function () {
  // Typing effect
  const roleText = "Senior DevOps Engineer";
  const typingEl = document.getElementById("typing-role");
  let i = 0;

  function typeWriter() {
    if (i < roleText.length) {
      typingEl.textContent += roleText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();

  // Fade-in on scroll
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
});
