<script lang="ts" setup>
interface DiagramNode {
  name: string;
  detail?: string;
  x: number;
  y: number;
  primary?: boolean;
}

type EdgeKind = 'sdk' | 'm2m' | 'service';

interface DiagramEdge {
  path: string;
  kind: EdgeKind;
  label?: { text: string; x: number; y: number; anchor?: 'start' | 'middle' | 'end' };
}

defineProps<{ title: string }>();

const NODE_WIDTH = 150;
const NODE_HEIGHT = 48;

const NODES: DiagramNode[] = [
  { name: 'every other server', x: 20, y: 20 },
  { name: 'identity', detail: 'login · PDP · M2M', x: 285, y: 20, primary: true },
  { name: 'memoir', x: 285, y: 160 },
  { name: 'novel-forge', x: 20, y: 290 },
  { name: 'pulse', detail: 'notifications sink', x: 550, y: 90 },
  { name: 'synapse', detail: 'AI inference · models', x: 550, y: 200 },
  { name: 'web-novel', x: 550, y: 300 },
];

const EDGES: DiagramEdge[] = [
  { path: 'M170 44 H281', kind: 'sdk', label: { text: 'auth SDK', x: 227, y: 36 } },
  { path: 'M435 44 C 490 44, 500 114, 546 114', kind: 'm2m' },
  { path: 'M435 184 C 490 184, 500 114, 546 114', kind: 'm2m' },
  { path: 'M435 184 C 490 184, 500 224, 546 224', kind: 'm2m' },
  { path: 'M170 314 C 330 314, 400 224, 546 224', kind: 'm2m' },
  { path: 'M170 322 C 330 322, 420 324, 546 324', kind: 'm2m', label: { text: 'publish, one-way', x: 360, y: 340 } },
  { path: 'M300 68 C 280 170, 150 200, 110 286', kind: 'service', label: { text: 'svc:// bot ownership', x: 160, y: 150 } },
];
</script>

<template>
  <div class="scroller" tabindex="0" role="group" :aria-label="title">
    <svg class="diagram" viewBox="0 0 720 360" role="img" aria-labelledby="platform-diagram-title">
      <title id="platform-diagram-title">{{ title }}</title>
      <defs>
        <marker id="platform-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 8 4 0 8z" fill="context-stroke" />
        </marker>
      </defs>
      <g v-for="edge in EDGES" :key="edge.path">
        <path class="edge" :class="`edge--${edge.kind}`" :d="edge.path" marker-end="url(#platform-arrow)" />
        <text v-if="edge.label" class="edge-label" :x="edge.label.x" :y="edge.label.y" :text-anchor="edge.label.anchor ?? 'middle'">
          {{ edge.label.text }}
        </text>
      </g>
      <g v-for="node in NODES" :key="node.name" :class="{ primary: node.primary }">
        <rect class="node" :x="node.x" :y="node.y" :width="NODE_WIDTH" :height="NODE_HEIGHT" rx="10" />
        <text class="name" :x="node.x + NODE_WIDTH / 2" :y="node.y + (node.detail ? 21 : 29)">{{ node.name }}</text>
        <text v-if="node.detail" class="detail" :x="node.x + NODE_WIDTH / 2" :y="node.y + 37">{{ node.detail }}</text>
      </g>
    </svg>
  </div>
  <ul class="legend" role="list">
    <li><span class="swatch swatch--sdk" aria-hidden="true"></span>auth SDK</li>
    <li><span class="swatch swatch--m2m" aria-hidden="true"></span>M2M call</li>
    <li><span class="swatch swatch--service" aria-hidden="true"></span>service route</li>
  </ul>
</template>

<style scoped>
.scroller {
  overflow-x: auto;
  padding: 20px;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
  background-color: var(--sh-surface-card);
  background-image: radial-gradient(color-mix(in srgb, var(--sh-text-primary) 9%, transparent) 1px, transparent 1.5px);
  background-size: 18px 18px;
}

.diagram {
  display: block;
  width: 100%;
  min-width: 600px;
  height: auto;
}

.node {
  fill: var(--sh-surface-card);
  stroke: var(--sh-border-strong);
}

.primary .node {
  fill: var(--sh-accent-soft);
  stroke: var(--sh-accent);
}

.name,
.detail,
.edge-label {
  font-family: var(--sh-font-mono);
}

.name,
.detail {
  text-anchor: middle;
}

.name {
  font-size: 13px;
  font-weight: 600;
  fill: var(--sh-text-primary);
}

.primary .name {
  fill: var(--sh-accent-text);
}

.detail {
  font-size: 10px;
  fill: var(--sh-text-tertiary);
}

.edge {
  fill: none;
  stroke-width: 1.5;
}

.edge--sdk {
  stroke: var(--sh-accent);
}

.edge--m2m {
  stroke: var(--sh-text-tertiary);
}

.edge--service {
  stroke: var(--sh-success-text);
  stroke-dasharray: 5 5;
}

.edge-label {
  font-size: 11px;
  fill: var(--sh-text-secondary);
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
  color: var(--sh-text-secondary);
}

.legend li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.swatch {
  width: 20px;
  height: 0;
  border-top: 2px solid var(--sh-text-tertiary);
}

.swatch--sdk {
  border-top-color: var(--sh-accent);
}

.swatch--service {
  border-top: 2px dashed var(--sh-success-text);
}
</style>
