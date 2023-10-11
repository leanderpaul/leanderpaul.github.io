<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const isNavBorder = ref(window.scrollY > 0);
onMounted(() => window.addEventListener('scroll', () => (isNavBorder.value = window.scrollY > 0)));
</script>
<template>
  <nav :class="{ bordered: isNavBorder }">
    <a href="/">
      <svg width="50" height="50" viewBox="0 0 24 24">
        <text x="2.5" y="17">LP</text>
      </svg>
    </a>
    <ol>
      <li>
        <a href="#about">About</a>
      </li>
      <li>
        <a href="#experience">Experience</a>
      </li>
      <li>
        <a href="#projects">Projects</a>
      </li>
      <li>
        <a href="#contact-me">Contact</a>
      </li>
      <a class="btn" href="/resume.pdf" target="_blank">Resume</a>
    </ol>
  </nav>
  <section>
    <a href="https://github.com/leanderpaul" target="_blank">
      <svg width="25" height="25" viewBox="0 0 30 30">
        <title>GitHub</title>
        <path
          d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
        ></path>
      </svg>
    </a>
    <a href="https://linkedin.com/in/leander-paul" target="_blank">
      <svg width="22" height="22" viewBox="0 0 50 50">
        <title>LinkedIn</title>
        <path
          d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
        ></path>
      </svg>
    </a>
    <a href="mailto:leanderpaul97@gmail.com">
      <svg width="18" height="18" viewBox="0 0 64 64">
        <title>Email</title>
        <path d="M32,34.934L63.617,10.34C62.984,8.965,61.613,8,60,8H4c-1.613,0-2.984,0.965-3.617,2.34L32,34.934z"></path>
        <path
          d="M34.457,43.156C33.734,43.719,32.867,44,32,44s-1.734-0.281-2.457-0.844L0,20.18V52c0,2.211,1.789,4,4,4h56 c2.211,0,4-1.789,4-4V20.18L34.457,43.156z"
        ></path>
      </svg>
    </a>
    <a href="https://github.com/leanderpaul/leanderpaul.github.io" target="_blank">
      <svg width="25" height="25" viewBox="0 0 18 18">
        <title>Source Code</title>
        <path
          stroke="currentColor"
          stroke-width="0.75"
          d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"
        />
      </svg>
    </a>
  </section>
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
}

nav.bordered {
  height: 70px;
  background-color: var(--background-default);
}

section {
  position: fixed;
  display: flex;
  top: calc(50% - 70px);
  height: 160px;
  padding: 0px 25px;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
}

svg {
  fill: var(--color-primary);
}

section svg {
  fill: var(--text-default);
}

text {
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 14px;
}

section svg:hover {
  cursor: pointer;
  fill: var(--text-lighter);
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
</style>
