<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';

const isNavOpen = ref(false);
const isNavBorder = ref(window.scrollY > 0);
onMounted(() => window.addEventListener('scroll', () => (isNavBorder.value = window.scrollY > 0)));
watchEffect(() => (document.body.style.overflow = isNavOpen.value ? 'hidden' : 'auto'));
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
        <a class="btn" href="/resume.pdf" target="_blank">Resume</a>
      </ol>
    </div>
  </nav>
  <div :class="{ blur: isNavOpen }"></div>
</template>
<style scoped>
nav {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px;
  width: calc(100% - 100px);
  height: 100px;
  z-index: 10;
  font-size: 14px;
  transition: height 0.2s;
  background-color: var(--background-default);
}

nav.bordered {
  height: 70px;
}

nav.bordered:not(.open) {
  box-shadow: 0 10px 30px -10px var(--background-dark);
}

svg {
  fill: var(--color-primary);
}

.hamburger {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;
}

.hamburger span {
  display: block;
  position: absolute;
  height: 2px;
  background-color: var(--color-primary);
  width: 30px;
  margin-left: auto;
  transition: all 0.23s ease-in-out;
  transform-origin: top right;
  transform: rotate(0deg);
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

li a:not(:hover) {
  color: var(--text-lighter);
}

li a::before {
  content: '0' counter(item) '. ';
  color: var(--color-primary);
}

.btn {
  margin-left: 10px;
}

.blur {
  position: fixed;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px) brightness(0.7);
  z-index: 5;
  top: 0;
  left: 0;
  overflow: hidden;
}

@media (max-width: 768px) {
  nav {
    padding: 0px 25px;
    width: calc(100% - 50px);
  }

  ol {
    margin-top: 0px;
    flex-direction: column;
    background-color: var(--background-default);
    align-items: flex-start;
    padding: 25px;
    border-bottom: 1px solid var(--background-light);
  }

  li {
    margin: 0px;
    width: 100%;
  }

  li a {
    display: block;
    padding: 10px 0px;
  }

  .btn {
    margin-top: 20px;
  }

  .nav-links {
    position: fixed;
    width: 100vw;
    height: 0px;
    top: 100px;
    left: 0;
    overflow: hidden;
    transition: all 0.23s ease-in-out;
  }

  .bordered .nav-links {
    top: 70px;
  }

  .open div.nav-links {
    height: 410px;
  }
}
</style>
