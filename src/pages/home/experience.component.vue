<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { experiences, type Experience } from '@app/data';

const activeTab = ref(experiences[0] as Experience);
const activeIndicatorStyle = reactive<{ top: string; left: string; display?: 'none' }>({ top: '1000px', left: '0px', display: 'none' });

function handleClick(event: MouseEvent, experience: Experience) {
  activeTab.value = experience;
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

onMounted(() => (window.addEventListener('resize', positionActiveIndicator), positionActiveIndicator()));
</script>
<template>
  <div id="experience" class="section">
    <div class="heading">Where I've Worked</div>
    <div class="content">
      <div class="tab-title">
        <button
          v-for="experience in experiences"
          :class="{ active: activeTab.company === experience.company }"
          @click="handleClick($event, experience)"
        >
          {{ experience.company }}
        </button>
        <div :style="activeIndicatorStyle" class="active-indicator"></div>
      </div>
      <div class="tab-content">
        <h3>
          <span>{{ activeTab.designation }}</span>
          <a class="company" :href="activeTab.companyUrl" target="_blank">{{ activeTab.company }}</a>
        </h3>
        <p>{{ activeTab.startDate }} - {{ activeTab.endDate }}</p>
        <ul>
          <li v-for="item in activeTab.description">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  gap: 50px;
  text-align: justify;
  height: 600px;
}

.tab-title {
  display: flex;
}

.tab-title > button {
  background: none;
  color: inherit;
  border: none;
  padding: 10px 25px;
  font: inherit;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.tab-title > button:hover {
  background-color: #112240;
  color: var(--color-primary);
}

.tab-title > button.active {
  color: var(--color-primary);
}

.active-indicator {
  position: absolute;
  background-color: var(--color-primary);
  transition: all 0.2s ease-in-out;
  width: 3px;
  height: 45px;
}

.tab-content {
  flex-basis: min-content;
  flex-grow: 1;
}

.tab-content .company {
  margin-left: 5px;
  color: var(--color-primary);
}

.tab-content .company::before {
  content: '@ ';
}

.tab-content .company a {
  color: var(--color-primary);
}

.tab-content p {
  font-size: 14px;
  margin-top: 5px;
  letter-spacing: 1px;
}

.tab-content ul {
  padding-left: 20px;
}

.tab-content li {
  margin-bottom: 5px;
}

@media (max-width: 768px) {
  .tab-title {
    overflow-x: auto;
    white-space: nowrap;
  }

  .tab-title > button {
    width: 130px;
    padding: 10px;
    text-align: center;
    flex-shrink: 0;
    border-bottom: 2px solid #233554;
  }

  .content {
    flex-direction: column;
    height: 1100px;
  }

  .active-indicator {
    width: 120px;
    height: 3px;
    margin-top: 43px;
  }
}

@media (min-width: 768px) {
  .tab-title {
    flex-direction: column;
  }

  .tab-title > button {
    border-left: 2px solid #233554;
  }
}
</style>
