export function initNavigation() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-nav');
  if (!header || !toggle || !navigation) return;

  const mobile = window.matchMedia('(max-width: 640px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animation;

  function setOpen(open, returnFocus = false) {
    animation?.cancel();
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '關閉導覽選單' : '開啟導覽選單');
    navigation.hidden = mobile.matches && !open;
    if (returnFocus) toggle.focus();
    if (open && mobile.matches && !reducedMotion.matches) {
      animation = navigation.animate([
        { opacity: 0, transform: 'translateY(-8px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 220, easing: 'ease-out' });
    }
  }

  function updateViewport() {
    const focusWasInside = navigation.contains(document.activeElement);
    toggle.hidden = !mobile.matches;
    header.classList.toggle('has-mobile-menu', mobile.matches);
    setOpen(false, mobile.matches && focusWasInside);
  }

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setOpen(false, true);
    }
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target) && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
  });
  header.addEventListener('focusout', event => {
    if (event.relatedTarget && !header.contains(event.relatedTarget) && mobile.matches) setOpen(false);
  });
  mobile.addEventListener('change', updateViewport);
  const updateScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateViewport();
  updateScroll();
}
