/* AgenticDeploy — Scroll Animations & Interactions */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Smooth counter animation for stats
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    let started = false;

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = prefix + Math.round(target * eased).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          step();
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    countObserver.observe(el);
  });

  // Parallax on hero image
  const heroImg = document.querySelector('.hero-visual img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < 800) {
        heroImg.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
    }, { passive: true });
  }

  // Pulse animation on CTA buttons when in view
  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('pulse');
        setTimeout(() => entry.target.classList.remove('pulse'), 1000);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.btn-primary').forEach(el => ctaObserver.observe(el));
});
