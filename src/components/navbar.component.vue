<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue';
import { useRoute } from 'vue-router';

import { RESUME_DOWNLOAD_NAME, RESUME_FILE } from '@app/content';

import { ShButton } from './ui';
import ThemeToggle from './theme-toggle.component.vue';

const NAV_LINKS = [
  { label: 'Experience', hash: '#experience' },
  { label: 'Work', hash: '#work' },
  { label: 'Open source', hash: '#open-source' },
  { label: 'Contact', hash: '#contact' },
];
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

const route = useRoute();
const mobileQuery = window.matchMedia('(max-width: 767px)');
const isMobile = ref(mobileQuery.matches);
const isOpen = ref(false);
const isScrolled = ref(window.scrollY > 0);
const isMenuInert = computed(() => isMobile.value && !isOpen.value);
const navElement = useTemplateRef<HTMLElement>('nav');
const menuElement = useTemplateRef<HTMLElement>('menu');
const toggleElement = useTemplateRef<HTMLButtonElement>('toggle');
let previousOverflow = '';

function onScroll() {
  isScrolled.value = window.scrollY > 0;
}

function onViewportChange(event: MediaQueryListEvent) {
  isMobile.value = event.matches;
  if (!event.matches) isOpen.value = false;
}

function close() {
  if (!isOpen.value) return;
  const hadFocusInMenu = menuElement.value?.contains(document.activeElement) ?? false;
  isOpen.value = false;
  if (hadFocusInMenu) toggleElement.value?.focus();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return;
  event.preventDefault();
  isOpen.value = false;
  toggleElement.value?.focus();
}

function onNavKeydown(event: KeyboardEvent) {
  if (event.key !== 'Tab' || !isOpen.value || !isMobile.value) return;
  const focusable = Array.from(navElement.value?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function onMenuClick(event: MouseEvent) {
  if (event.target instanceof Element && event.target.closest('a')) close();
}

function lockScroll() {
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.overflow = previousOverflow;
}

watch(isOpen, open => {
  if (open) {
    lockScroll();
    window.addEventListener('keydown', onKeydown);
    return;
  }
  unlockScroll();
  window.removeEventListener('keydown', onKeydown);
});

watch(() => route.fullPath, close);

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  mobileQuery.addEventListener('change', onViewportChange);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('keydown', onKeydown);
  mobileQuery.removeEventListener('change', onViewportChange);
  if (isOpen.value) unlockScroll();
});
</script>
<template>
  <header>
    <nav ref="nav" aria-label="Primary" :class="{ bordered: isScrolled, open: isOpen }" @keydown="onNavKeydown">
      <router-link class="logo" to="/" aria-label="Leander Paul, home">
        <svg width="50" height="50" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <text x="2.5" y="17">LP</text>
        </svg>
      </router-link>
      <button
        ref="toggle"
        class="hamburger"
        type="button"
        aria-label="Menu"
        aria-controls="nav-links"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="bars" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <div id="nav-links" ref="menu" class="nav-links" :inert="isMenuInert" @click="onMenuClick">
        <div class="panel">
          <ul>
            <li v-for="item in NAV_LINKS" :key="item.hash">
              <router-link v-slot="{ href, navigate }" custom :to="{ path: '/', hash: item.hash }">
                <a :href="href" @click="navigate">{{ item.label }}</a>
              </router-link>
            </li>
            <li class="resume">
              <ShButton variant="secondary" :href="RESUME_FILE" :download="RESUME_DOWNLOAD_NAME" aria-label="Download résumé (PDF)"
                >Résumé</ShButton
              >
            </li>
            <li class="theme">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="isOpen" class="scrim" aria-hidden="true" @click="close"></div>
  </header>
</template>
<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0px 48px;
  z-index: var(--sh-z-shell);
  font-size: var(--sh-text-body);
  background-color: var(--sh-surface-app);
  border-bottom: var(--sh-border-width) solid transparent;
  transition:
    height var(--sh-duration-normal) var(--sh-ease-standard),
    border-color var(--sh-duration-normal) var(--sh-ease-standard);
}

nav.bordered {
  height: 70px;
}

nav.bordered:not(.open) {
  border-bottom-color: var(--sh-border-default);
  box-shadow: var(--sh-shadow-e1);
}

svg {
  fill: var(--sh-accent-text);
}

text {
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 14px;
}

.hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: var(--sh-tap-target);
  height: var(--sh-tap-target);
  padding: 0px;
  background-color: transparent;
  border: none;
  border-radius: var(--sh-radius-md);
}

.bars {
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
}

.bars span {
  position: absolute;
  display: block;
  width: 30px;
  height: 2px;
  background-color: var(--sh-accent-text);
  transform-origin: top right;
  transform: rotate(0deg);
  transition:
    transform var(--sh-duration-normal) var(--sh-ease-standard),
    width var(--sh-duration-normal) var(--sh-ease-standard),
    opacity var(--sh-duration-normal) var(--sh-ease-standard);
}

.bars span:nth-child(1) {
  top: 0px;
  left: 0px;
}

.bars span:nth-child(2) {
  top: 10px;
  left: 10px;
  width: 20px;
}

.bars span:nth-child(3) {
  top: 20px;
  left: 5px;
  width: 25px;
}

.open .bars span:first-child {
  transform: translateY(-0.5px) rotate(-45deg);
}

.open .bars span:nth-child(2) {
  width: 0px;
  opacity: 0;
}

.open .bars span:last-child {
  transform: translateX(-5px) translateY(0.5px) rotate(45deg);
  width: 30px;
}

ul {
  display: flex;
  align-items: center;
  margin: 0px;
  padding: 0px;
  list-style: none;
}

li {
  margin: 0px 10px;
}

li > a {
  text-decoration: none;
}

li > a:not(:hover) {
  color: var(--sh-text-primary);
}

li > a:hover {
  color: var(--sh-accent-text);
}

.scrim {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--sh-z-sticky);
  width: 100vw;
  height: var(--sh-viewport-height);
  overflow: hidden;
  background-color: var(--sh-scrim);
}

@media (max-width: 767px) {
  nav {
    padding: 0px 24px;
  }

  .hamburger {
    display: inline-flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    transition:
      grid-template-rows var(--sh-duration-normal) var(--sh-ease-standard),
      visibility 0s linear var(--sh-duration-normal);
  }

  .open .nav-links {
    grid-template-rows: 1fr;
    visibility: visible;
    transition-delay: 0s;
  }

  .panel {
    min-height: 0px;
    overflow: hidden;
    background-color: var(--sh-surface-app);
  }

  ul {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    border-bottom: var(--sh-border-width) solid var(--sh-border-default);
  }

  li {
    width: 100%;
    margin: 0px;
  }

  li > a {
    display: flex;
    align-items: center;
    min-height: var(--sh-tap-target);
  }

  li.resume {
    margin-top: 12px;
  }

  li.theme {
    margin-top: 12px;
  }
}

@media (min-width: 768px) {
  li.resume {
    margin-left: 20px;
  }
}
</style>
