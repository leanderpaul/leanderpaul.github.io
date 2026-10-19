<script lang="ts" setup>
defineProps<{ id: string; title: string }>();
</script>

<template>
  <section :id="id" :aria-labelledby="`${id}-title`">
    <header class="header">
      <h2 :id="`${id}-title`" class="title">{{ title }}</h2>
      <p v-if="$slots.lead" class="lead"><slot name="lead" /></p>
    </header>
    <slot />
  </section>
</template>

<style scoped>
.header {
  margin-bottom: 32px;
}

.title {
  font-size: var(--sh-text-h1);
  line-height: var(--sh-text-h1--line-height);
  font-weight: 600;
  letter-spacing: -0.01em;
}

.lead {
  max-width: 68ch;
  margin-top: 8px;
  color: var(--sh-text-secondary);
}

@media (max-width: 768px) {
  .header {
    margin-bottom: 24px;
  }

  .title {
    font-size: var(--sh-text-h2);
    line-height: var(--sh-text-h2--line-height);
  }
}
</style>
