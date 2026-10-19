<script lang="ts" setup>
import { PROFILE } from '@app/content';
</script>
<template>
  <div class="intro">
    <h1 class="title">Hi, I am {{ PROFILE.name }}</h1>
    <div class="subtitle">{{ PROFILE.headline }}</div>
    <p class="tagline">{{ PROFILE.tagline }}</p>
    <a class="btn" href="#projects">Projects</a>
  </div>
</template>
<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(var(--sh-viewport-height) - 140px);
}

.title {
  margin-bottom: 32px;
  font-size: var(--sh-text-hero);
  line-height: var(--sh-text-hero--line-height);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-align: center;
  color: var(--sh-text-primary);
}

.subtitle {
  max-width: 600px;
  margin-bottom: 24px;
  font-size: var(--sh-text-h2);
  line-height: var(--sh-text-h2--line-height);
  font-weight: 500;
  text-align: center;
  color: var(--sh-text-primary);
}

.tagline {
  max-width: 600px;
  margin-bottom: 48px;
  text-align: center;
  color: var(--sh-text-secondary);
}

.btn {
  width: 200px;
}

@media (max-width: 768px) {
  .subtitle {
    font-size: var(--sh-text-h3);
    line-height: var(--sh-text-h3--line-height);
  }
}
</style>
