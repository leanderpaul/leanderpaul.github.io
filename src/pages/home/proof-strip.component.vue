<script lang="ts" setup>
import { ShStatistic } from '@app/components/ui';
import { PROOF_POINTS } from '@app/content';
</script>

<template>
  <section class="proof" aria-labelledby="proof-title">
    <h2 id="proof-title" class="visually-hidden">At a glance</h2>
    <ul class="grid" role="list">
      <li v-for="point in PROOF_POINTS" :key="point.value" class="cell">
        <ShStatistic :value="point.value" :label="point.label" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.proof {
  container-type: inline-size;
  padding-bottom: 64px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--sh-border-width);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  background: var(--sh-border-default);
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
}

.cell {
  min-width: 0;
  padding: 24px;
  background: var(--sh-surface-card);
  overflow-wrap: anywhere;
}

@container (max-width: 640px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .cell {
    padding: 20px;
  }
}
</style>
