<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { EXPERIENCE, formatDateRange, formatRoleTitle, type Role } from '@app/content';

const roles = EXPERIENCE.filter((entry): entry is Role => entry.kind === 'role');
const activeTab = ref(roles[0] as Role);
const activeIndicatorStyle = reactive<{ top: string; left: string; display?: 'none' }>({ top: '1000px', left: '0px', display: 'none' });

function handleClick(event: MouseEvent, role: Role) {
  activeTab.value = role;
  const btn = event.target as HTMLButtonElement;
  activeIndicatorStyle.top = `${btn.offsetTop}px`;
  activeIndicatorStyle.left = `${btn.offsetLeft}px`;
}

function positionActiveIndicator() {
  const activeTabTitle = document.querySelector('.tab-title > .active') as HTMLButtonElement;
  activeIndicatorStyle.top = `${activeTabTitle.offsetTop}px`;
  activeIndicatorStyle.left = `${activeTabTitle.offsetLeft}px`;
  activeIndicatorStyle.display = undefined;
}

onMounted(() => {
  window.addEventListener('resize', positionActiveIndicator);
  setTimeout(positionActiveIndicator, window.innerWidth <= 768 ? 100 : 0);
});

onUnmounted(() => {
  window.removeEventListener('resize', positionActiveIndicator);
});
</script>
<template>
  <div id="experience" class="section">
    <div class="heading">Where I've Worked</div>
    <div class="content">
      <div class="tab-title">
        <button
          v-for="role in roles"
          :key="role.company"
          :class="{ active: activeTab.company === role.company }"
          @click="handleClick($event, role)"
        >
          {{ role.company }}
        </button>
        <div :style="activeIndicatorStyle" class="active-indicator"></div>
      </div>
      <div class="tab-content">
        <h3>
          <span>{{ formatRoleTitle(activeTab) }}</span>
          <a v-if="activeTab.companyUrl" class="company" :href="activeTab.companyUrl" target="_blank" rel="noopener">{{
            activeTab.company
          }}</a>
          <span v-else class="company">{{ activeTab.company }}</span>
        </h3>
        <p class="client" v-if="activeTab.client">
          <span>Client:</span>
          <a v-if="activeTab.clientUrl" :href="activeTab.clientUrl" target="_blank" rel="noopener">{{ activeTab.client }}</a>
          <span v-else>{{ activeTab.client }}</span>
        </p>
        <p class="period">{{ formatDateRange(activeTab.start, activeTab.end) }}</p>
        <ul>
          <li v-for="item in activeTab.siteBullets" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  gap: 48px;
  min-height: 600px;
}

.tab-title {
  position: relative;
  display: flex;
}

.tab-title > button {
  width: 160px;
  padding: 10px 24px;
  border: none;
  background: none;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  color: var(--sh-text-secondary);
  text-align: left;
}

.tab-title > button:hover {
  background-color: var(--sh-bg-hover);
  color: var(--sh-accent-text);
}

.tab-title > button.active {
  color: var(--sh-accent-text);
}

.active-indicator {
  position: absolute;
  width: 2px;
  height: 44px;
  background-color: var(--sh-accent);
  transition:
    top var(--sh-duration-normal) var(--sh-ease-standard),
    left var(--sh-duration-normal) var(--sh-ease-standard);
}

.tab-content {
  flex-basis: min-content;
  flex-grow: 1;
  color: var(--sh-text-secondary);
}

.tab-content h3 {
  font-size: var(--sh-text-h2);
  line-height: var(--sh-text-h2--line-height);
}

.tab-content .company {
  margin-left: 6px;
  color: var(--sh-accent-text);
}

.tab-content .company::before {
  content: '@ ';
}

.tab-content p {
  margin-top: 4px;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  line-height: var(--sh-text-code--line-height);
  color: var(--sh-text-tertiary);
}

.tab-content .client {
  margin-bottom: 4px;
}

.tab-content .client a {
  margin-left: 6px;
}

.tab-content ul {
  padding-left: 20px;
}

.tab-content li {
  margin-bottom: 8px;
}

.tab-content li::marker {
  color: var(--sh-accent-text);
}

@media (max-width: 768px) {
  .tab-title {
    overflow-x: auto;
    white-space: nowrap;
  }

  .tab-title > button {
    flex-shrink: 0;
    width: 190px;
    padding: 10px;
    text-align: center;
    border-bottom: 2px solid var(--sh-border-default);
  }

  .content {
    flex-direction: column;
    min-height: 1100px;
  }

  .active-indicator {
    width: 190px;
    height: 2px;
    margin-top: 44px;
  }
}

@media (min-width: 768px) {
  .tab-title {
    flex-direction: column;
  }

  .tab-title > button {
    border-left: 2px solid var(--sh-border-default);
  }
}
</style>
