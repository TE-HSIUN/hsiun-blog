export function initMotion() {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;
  const animated = new WeakSet();
  const activeAnimations = new Set();

  // Keep content visible by default; animation only starts as a card enters view.
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (preference.matches || animated.has(entry.target)) continue;
      animated.add(entry.target);
      const animation = entry.target.animate([
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 420, easing: 'cubic-bezier(.22,.61,.36,1)' });
      activeAnimations.add(animation);
      animation.finished.finally(() => activeAnimations.delete(animation)).catch(() => {});
    }
  }, { threshold: 0.08 });

  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  preference.addEventListener('change', () => {
    if (preference.matches) {
      for (const animation of activeAnimations) animation.cancel();
      activeAnimations.clear();
    }
  });
}
