<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
import { RESUME_FILES } from '@app/content';
import { getResumeVariant } from '@app/utils';

import ThemeToggle from './theme-toggle.component.vue';

const resumeFile = RESUME_FILES[getResumeVariant()].file;
const isNavOpen = ref(false);
const isNavBorder = ref(window.scrollY > 0);

watchEffect(() => (document.body.style.overflow = isNavOpen.value ? 'hidden' : 'auto'));
onMounted(() => {
  window.addEventListener('scroll', () => (isNavBorder.value = window.scrollY > 0));
});
</script>
<template>
  <nav :class="{ bordered: isNavBorder, open: isNavOpen }">
    <router-link to="/">
      <svg width="50" height="50" viewBox="0 0 24 24">
        <text x="2.5" y="17">LP</text>
      </svg>
    </router-link>
    <div class="hamburger md-hide" @click="isNavOpen = !isNavOpen">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="nav-links" @click="isNavOpen = false">
      <ol>
        <li>
          <router-link to="/#about">About</router-link>
        </li>
        <li>
          <router-link to="/#experience">Experience</router-link>
        </li>
        <li>
          <router-link to="/#projects">Projects</router-link>
        </li>
        <li>
          <router-link to="/#contact-me">Contact</router-link>
        </li>
        <li class="resume">
          <a class="btn" :href="resumeFile" target="_blank" rel="noopener">Resume</a>
        </li>
        <li class="theme" @click.stop>
          <ThemeToggle />
        </li>
      </ol>
    </div>
  </nav>
  <div :class="{ scrim: isNavOpen }"></div>
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

.hamburger {
  position: relative;
  width: 30px;
  height: 30px;
}

.hamburger span {
  position: absolute;
  display: block;
  width: 30px;
  height: 2px;
  margin-left: auto;
  background-color: var(--sh-accent-text);
  transform-origin: top right;
  transform: rotate(0deg);
  transition:
    transform var(--sh-duration-normal) var(--sh-ease-standard),
    width var(--sh-duration-normal) var(--sh-ease-standard),
    opacity var(--sh-duration-normal) var(--sh-ease-standard);
}

.hamburger span:nth-child(2) {
  top: 10px;
  left: 10px;
  width: 20px;
}

.hamburger span:nth-child(3) {
  top: 20px;
  left: 5px;
  width: 25px;
}

.open .hamburger span:first-child {
  transform: translateY(-0.5px) rotate(-45deg);
}

.open .hamburger span:nth-child(2) {
  width: 0px;
  opacity: 0;
}

.open .hamburger span:last-child {
  transform: translateX(-5px) translateY(0.5px) rotate(45deg);
  width: 30px;
}

text {
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 14px;
}

ol {
  display: flex;
  align-items: center;
  list-style: none;
}

li {
  margin: 0px 10px;
  counter-increment: item 1;
}

li a {
  text-decoration: none;
}

li a:not(:hover) {
  color: var(--sh-text-primary);
}

li a:hover {
  color: var(--sh-accent-text);
}

li a::before {
  content: '0' counter(item) '. ';
  font-family: var(--sh-font-mono);
  color: var(--sh-accent-text);
}

li.resume {
  counter-increment: none;
}

li.theme {
  counter-increment: none;
}

li.resume a::before {
  content: none;
}

li.resume a:not(:hover) {
  color: var(--sh-accent-text);
}

li.resume a:hover {
  color: var(--sh-on-accent);
}

.btn {
  margin-left: 10px;
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

@media (max-width: 768px) {
  nav {
    padding: 0px 24px;
  }

  ol {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 0px;
    padding: 24px;
    background-color: var(--sh-surface-app);
    border-bottom: var(--sh-border-width) solid var(--sh-border-default);
  }

  li {
    margin: 0px;
    width: 100%;
  }

  li a {
    display: block;
    padding: 10px 0px;
  }

  li.theme {
    margin-top: 10px;
  }

  .btn {
    margin-top: 20px;
    margin-left: 0px;
  }

  .nav-links {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100vw;
    height: 0px;
    overflow: hidden;
    transition:
      height var(--sh-duration-normal) var(--sh-ease-standard),
      top var(--sh-duration-normal) var(--sh-ease-standard);
  }

  .bordered .nav-links {
    top: 70px;
  }

  .open div.nav-links {
    height: 470px;
  }
}
</style>
