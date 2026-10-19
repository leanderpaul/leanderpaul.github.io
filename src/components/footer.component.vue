<script lang="ts" setup>
import { SOCIAL_LINKS } from './social-links.util';
</script>
<template>
  <footer>
    <nav aria-label="Footer">
      <ul>
        <li v-for="link in SOCIAL_LINKS" :key="link.label">
          <a :href="link.href" :target="link.external ? '_blank' : undefined" :rel="link.external ? 'noopener' : undefined">{{
            link.label
          }}</a>
        </li>
      </ul>
    </nav>
    <p>Designed and built by Leander Paul with Vue.</p>
  </footer>
</template>
<style scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 100px;
  padding: 0px 24px 24px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 24px;
  list-style: none;
  margin: 0px;
  padding: 0px;
}

a {
  display: inline-flex;
  align-items: center;
  min-height: var(--sh-tap-target);
  color: var(--sh-text-secondary);
  text-decoration: none;
}

a:hover {
  color: var(--sh-text-primary);
  text-decoration: underline;
}

p {
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
  color: var(--sh-text-tertiary);
}
</style>
