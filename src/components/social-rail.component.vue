<script lang="ts" setup>
import { SOCIAL_LINKS } from './social-links.util';
</script>
<template>
  <nav class="rail" aria-label="Social">
    <ul>
      <li v-for="link in SOCIAL_LINKS" :key="link.label">
        <a
          :href="link.href"
          :aria-label="link.label"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener' : undefined"
        >
          <svg v-if="link.icon === 'email'" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <svg v-else-if="link.icon === 'linkedin'" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          <svg v-else-if="link.icon === 'github'" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            />
          </svg>
          <svg v-else-if="link.icon === 'organization'" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m12 2 9 5-9 5-9-5 9-5z" />
            <path d="m3 12 9 5 9-5" />
            <path d="m3 17 9 5 9-5" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m16 18 6-6-6-6" />
            <path d="m8 6-6 6 6 6" />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
.rail {
  display: none;
}

@media (min-width: 1024px) {
  .rail {
    position: fixed;
    top: 50%;
    left: 16px;
    z-index: var(--sh-z-sticky);
    display: block;
    transform: translateY(-50%);
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
    margin: 0px;
    padding: 0px;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sh-tap-target);
    height: var(--sh-tap-target);
    color: var(--sh-text-secondary);
    border-radius: var(--sh-radius-md);
    transition:
      color var(--sh-duration-fast) var(--sh-ease-standard),
      background-color var(--sh-duration-fast) var(--sh-ease-standard);
  }

  a:hover {
    color: var(--sh-accent-text);
    background-color: var(--sh-accent-soft);
  }

  svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}
</style>
