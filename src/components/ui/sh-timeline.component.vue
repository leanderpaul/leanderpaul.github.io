<template>
  <ol class="root" role="list">
    <li v-for="(item, index) in items" :key="index" class="item">
      <span class="marker" aria-hidden="true"></span>
      <div class="content">
        <slot :item="item" :index="index" />
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts" generic="T">
defineProps<{ items: readonly T[] }>();

defineSlots<{ default(props: { item: T; index: number }): unknown }>();
</script>

<style scoped>
.root {
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  position: relative;
  display: flex;
  gap: 16px;
  padding-bottom: 32px;
}

.item:last-child {
  padding-bottom: 0;
}

.item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 9px;
  top: 20px;
  bottom: 0;
  width: 2px;
  background: var(--sh-border-default);
}

.marker {
  position: relative;
  z-index: var(--sh-z-base);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 2px solid var(--sh-accent);
  border-radius: var(--sh-radius-full);
  background: var(--sh-surface-app);
}

.marker::after {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: var(--sh-radius-full);
  background: var(--sh-accent);
}

.content {
  flex: 1;
  min-width: 0;
}
</style>
