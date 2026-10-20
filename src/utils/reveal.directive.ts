import { type Directive } from 'vue';

import { prefersReducedMotion } from './motion.util';

const observer =
  typeof IntersectionObserver === 'undefined' ? undefined : new IntersectionObserver(reveal, { rootMargin: '0px 0px -8% 0px' });

function reveal(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
    entry.target.dataset.reveal = 'shown';
    observer?.unobserve(entry.target);
  }
}

export const vReveal: Directive<HTMLElement> = {
  mounted(element) {
    if (!observer || prefersReducedMotion() || element.getBoundingClientRect().top < window.innerHeight) return;
    element.dataset.reveal = 'hidden';
    observer.observe(element);
  },
  unmounted(element) {
    observer?.unobserve(element);
  },
};
