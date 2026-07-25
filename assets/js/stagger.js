const SPRING_OUT = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const SMOOTH_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
const BLUR_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

export function staggerIn(container, options = {}) {
  const {
    variant = 'up',
    stagger = 80,
    duration = 700,
    threshold = 0.08,
    initialDelay = 0,
  } = options;

  const children = container.children;
  if (!children.length) {
    animateEl(container, 0, variant, duration, threshold);
    return;
  }

  const total = children.length;
  Array.from(children).forEach((el, i) => {
    const t = total > 1 ? i / (total - 1) : 1;
    const curveStagger = stagger * (0.4 + 0.6 * Math.pow(t, 0.6));
    animateEl(el, i, variant, duration, curveStagger, threshold, initialDelay);
  });
}

function animateEl(el, index, variant, duration, stagger, threshold, initialDelay = 0) {
  const delay = initialDelay + index * stagger;
  const [x, y, scale, rotate, blurPx] = getTransform(variant, index);
  const translateDuration = duration;
  const blurDuration = duration * 0.85;

  el.classList.add('stagger-item');
  el.style.opacity = '0';
  el.style.transform = `translate(${x}, ${y}) scale(${scale}) rotate(${rotate})`;
  el.style.filter = `blur(${blurPx}px)`;
  el.style.transition = `
    opacity ${translateDuration}ms ${SPRING_OUT},
    transform ${translateDuration}ms ${SPRING_OUT},
    filter ${blurDuration}ms ${BLUR_EASE}
  `;
  el.style.transitionDelay = `${delay}ms, ${delay}ms, ${delay + 30}ms`;
  el.style.willChange = 'opacity, transform, filter';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
          el.style.filter = 'blur(0)';
        });
        observer.unobserve(el);
      }
    });
  }, { threshold });
  observer.observe(el);
}

function getTransform(variant, index = 0) {
  const parity = index % 2 === 0 ? 1 : -1;
  const dist = 44;
  switch (variant) {
    case 'up':     return ['0',          `${dist}px`,  '1',    '0deg',           4];
    case 'down':   return ['0',          `${-dist}px`, '1',    '0deg',           4];
    case 'left':   return [`${-dist}px`, '0',          '1',    `${parity * 2}deg`, 5];
    case 'right':  return [`${dist}px`,  '0',          '1',    `${parity * -2}deg`, 5];
    case 'scale':  return ['0',          '0',          '0.85', '0deg',           6];
    case 'scale-up': return ['0',        `${dist}px`,  '0.8',  '0deg',           6];
    case 'tilt':   return ['0',          '24px',       '0.92', `${parity * 3}deg`, 5];
    case 'fade':   return ['0',          '0',          '1',    '0deg',           8];
    case 'fade-left': return [`${-dist}px`, '0',       '0.92', `${parity * 2}deg`, 7];
    default:       return ['0',          '32px',       '1',    '0deg',           4];
  }
}
