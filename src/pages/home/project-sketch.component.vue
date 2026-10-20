<script lang="ts" setup>
import { type FeaturedSlug } from '@app/content';

defineProps<{ slug: FeaturedSlug }>();

const IDENTITY_CLIENTS = [
  { name: 'memoir', x: 14, y: 14 },
  { name: 'synapse', x: 262, y: 14 },
  { name: 'pulse', x: 14, y: 112 },
  { name: 'novel-forge', x: 262, y: 112 },
  { name: 'web-novel', x: 138, y: 128 },
];
</script>

<template>
  <svg v-if="slug === 'identity'" class="sketch" viewBox="0 0 360 160" aria-hidden="true" focusable="false">
    <g v-for="client in IDENTITY_CLIENTS" :key="client.name">
      <line class="edge flow" :x1="client.x + 42" :y1="client.y + 12" x2="180" y2="72" />
      <rect class="node" :x="client.x" :y="client.y" width="84" height="24" rx="12" />
      <text class="label" :x="client.x + 42" :y="client.y + 16">{{ client.name }}</text>
    </g>
    <rect class="node node--primary" x="128" y="54" width="104" height="36" rx="8" />
    <text class="label label--primary" x="180" y="76">identity</text>
    <text class="caption" x="180" y="42">auth SDK · PDP · M2M</text>
  </svg>

  <svg v-else-if="slug === 'ai-platform'" class="sketch" viewBox="0 0 360 160" aria-hidden="true" focusable="false">
    <defs>
      <marker id="sketch-arrow-ai" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path class="arrowhead" d="M0 0 8 4 0 8z" />
      </marker>
    </defs>
    <line class="edge flow" x1="86" y1="44" x2="132" y2="44" marker-end="url(#sketch-arrow-ai)" />
    <line class="edge flow" x1="220" y1="44" x2="266" y2="44" marker-end="url(#sketch-arrow-ai)" />
    <path class="edge flow" d="M208 58 C 232 80, 250 108, 266 116" marker-end="url(#sketch-arrow-ai)" />
    <path class="edge flow" d="M160 58 C 148 80, 148 96, 156 110" marker-end="url(#sketch-arrow-ai)" />
    <path class="edge flow" d="M192 110 C 200 96, 200 80, 190 60" marker-end="url(#sketch-arrow-ai)" />
    <rect class="node" x="14" y="30" width="72" height="28" rx="8" />
    <text class="label" x="50" y="48">draft</text>
    <rect class="node node--primary" x="134" y="30" width="86" height="28" rx="8" />
    <text class="label label--primary" x="177" y="48">judge</text>
    <rect class="node" x="268" y="30" width="78" height="28" rx="8" />
    <text class="label" x="307" y="48">accept</text>
    <rect class="node" x="140" y="110" width="74" height="28" rx="8" />
    <text class="label" x="177" y="128">repair</text>
    <rect class="node" x="268" y="104" width="78" height="28" rx="8" />
    <text class="label" x="307" y="122">review</text>
  </svg>

  <svg v-else class="sketch" viewBox="0 0 360 160" aria-hidden="true" focusable="false">
    <defs>
      <marker id="sketch-arrow-atlas" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path class="arrowhead" d="M0 0 8 4 0 8z" />
      </marker>
    </defs>
    <rect class="node node--ghost" x="22" y="52" width="72" height="44" rx="8" />
    <rect class="node node--ghost" x="18" y="58" width="72" height="44" rx="8" />
    <rect class="node" x="14" y="64" width="72" height="44" rx="8" />
    <text class="label" x="50" y="90">repos</text>
    <line class="edge flow" x1="88" y1="86" x2="128" y2="86" marker-end="url(#sketch-arrow-atlas)" />
    <rect class="node node--primary" x="130" y="50" width="100" height="72" rx="10" />
    <line class="edge" x1="156" y1="72" x2="182" y2="66" />
    <line class="edge" x1="182" y1="66" x2="204" y2="80" />
    <line class="edge" x1="156" y1="72" x2="170" y2="92" />
    <line class="edge" x1="170" y1="92" x2="204" y2="80" />
    <circle class="dot" cx="156" cy="72" r="3.5" />
    <circle class="dot" cx="182" cy="66" r="3.5" />
    <circle class="dot" cx="204" cy="80" r="3.5" />
    <circle class="dot" cx="170" cy="92" r="3.5" />
    <text class="caption" x="180" y="112">SQLite graph</text>
    <path class="edge flow" d="M232 76 C 252 70, 256 52, 272 46" marker-end="url(#sketch-arrow-atlas)" />
    <path class="edge flow" d="M232 96 C 252 102, 256 118, 272 124" marker-end="url(#sketch-arrow-atlas)" />
    <rect class="node" x="274" y="32" width="72" height="28" rx="8" />
    <text class="label" x="310" y="50">catl</text>
    <rect class="node" x="274" y="110" width="72" height="28" rx="8" />
    <text class="label" x="310" y="128">MCP</text>
  </svg>
</template>

<style scoped>
.sketch {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.node {
  fill: var(--sh-surface-card);
  stroke: var(--sh-border-strong);
  stroke-width: 1;
}

.node--primary {
  fill: var(--sh-accent-soft);
  stroke: var(--sh-accent);
}

.node--ghost {
  fill: var(--sh-surface-card);
  stroke: var(--sh-border-default);
}

.label,
.caption {
  font-family: var(--sh-font-mono);
  text-anchor: middle;
}

.label {
  font-size: 11px;
  fill: var(--sh-text-secondary);
}

.label--primary {
  font-size: 12px;
  font-weight: 600;
  fill: var(--sh-accent-text);
}

.caption {
  font-size: 10px;
  fill: var(--sh-text-tertiary);
}

.edge {
  fill: none;
  stroke: color-mix(in srgb, var(--sh-accent) 55%, transparent);
  stroke-width: 1.25;
}

.flow {
  stroke-dasharray: 4 5;
}

.arrowhead,
.dot {
  fill: var(--sh-accent);
}

@media (prefers-reduced-motion: no-preference) {
  .flow {
    animation: flow 1.8s linear infinite;
  }
}

@keyframes flow {
  to {
    stroke-dashoffset: -18;
  }
}
</style>
