<script lang="ts" setup>
import { vReveal } from '@app/utils';

defineProps<{ id: string; title: string }>();
</script>

<template>
  <section :id="id" :aria-labelledby="`${id}-title`">
    <header v-reveal class="header">
      <span class="kicker" aria-hidden="true"></span>
      <h2 :id="`${id}-title`" class="title">{{ title }}</h2>
      <p v-if="$slots.lead" class="lead"><slot name="lead" /></p>
    </header>
    <slot />
  </section>
</template>

<style scoped>
.header {
  margin-bottom: 40px;
  counter-increment: section;
}

.kicker {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  line-height: var(--sh-text-code--line-height);
  color: var(--sh-accent-text);
}

.kicker::before {
  content: counter(section, decimal-leading-zero) ' /';
}

.kicker::after {
  content: '';
  flex: 1;
  height: var(--sh-border-width);
  background: linear-gradient(to right, var(--sh-border-default), transparent);
}

.title {
  font-size: var(--sh-text-section);
  line-height: var(--sh-text-section--line-height);
  font-weight: 700;
  letter-spacing: -0.025em;
}

.lead {
  max-width: 68ch;
  margin-top: 12px;
  color: var(--sh-text-secondary);
}

@media (max-width: 768px) {
  .header {
    margin-bottom: 28px;
  }
}
</style>
