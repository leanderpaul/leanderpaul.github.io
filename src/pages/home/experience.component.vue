<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';

const activeTab = ref('wtv');
const activeIndicatorStyle = reactive<{ top?: string; left?: string }>({});
const getTabTitles = () => document.querySelectorAll('.tab-title button') as NodeListOf<HTMLButtonElement>;
const getTabContents = () => document.querySelectorAll('.tab-content > div') as NodeListOf<HTMLDivElement>;
const activate = (state: boolean, element: HTMLElement) => (state ? element.classList.add('active') : element.classList.remove('active'));

function handleClick(event: MouseEvent) {
  const btn = event.target as HTMLButtonElement;
  activeIndicatorStyle.top = `${btn.offsetTop}px`;
  activeIndicatorStyle.left = `${btn.offsetLeft}px`;
  activeTab.value = btn.dataset.target as string;
  getTabTitles().forEach(tabTitle => activate(btn === tabTitle, tabTitle));
  getTabContents().forEach(tabContent => activate(btn.dataset.target === tabContent.id, tabContent));
}

function handleResize() {
  const tabTitles = getTabTitles();
  const activeTabTitle = tabTitles[Array.from(tabTitles).findIndex(tabTitle => tabTitle.dataset.target === activeTab.value)];
  activeIndicatorStyle.top = `${activeTabTitle.offsetTop}px`;
  activeIndicatorStyle.left = `${activeTabTitle.offsetLeft}px`;
}

onMounted(() => {
  const tabTitles = getTabTitles();
  tabTitles.forEach(tabTitle => tabTitle.addEventListener('click', handleClick));
  window.addEventListener('resize', handleResize);
  window.addEventListener('load', handleResize);
});
</script>
<template>
  <div id="experience" class="section">
    <div class="heading">Where I've Worked</div>
    <div class="content">
      <div class="tab-title">
        <button class="active" data-target="wtv">WTV</button>
        <button data-target="zoho">Zoho</button>
        <button data-target="phosphene-ai">Phosphene AI</button>
        <div :style="activeIndicatorStyle" class="active-indicator"></div>
      </div>
      <div class="tab-content">
        <div id="wtv" class="active">
          <h3>
            <span>Backend Developer</span>
            <span class="company">@ <a href="https://wtvglobal.com" target="_blank">WTV</a></span>
          </h3>
          <p>March 2023 - September 2023</p>
          <ul>
            <li>API Development for micro service architecture using RabbitMQ</li>
            <li>Developed REST logic and tests to validate the working of theapplication</li>
          </ul>
        </div>
        <div id="zoho">
          <h3>
            <span>Member Technical Staff</span>
            <span class="company">@ <a href="https://zoho.com" target="_blank">Zoho</a></span>
          </h3>
          <p>January 2020 - August 2022</p>
          <ul>
            <li>API Development using XML for internal service teams</li>
            <li>Maintained Redis Cache in Accounts for all API queries</li>
          </ul>
        </div>
        <div id="phosphene-ai">
          <h3>
            <span>Full Stack Developer</span>
            <span class="company">@ <a href="https://www.linkedin.com/company/phosphene-ai" target="_blank">Phosphene AI</a></span>
          </h3>
          <p>April 2018 - January 2020</p>
          <ul>
            <li>Maintained positive work ethic and commitment to providingexcellent service</li>
            <li>Designed the API and Database design for the application</li>
            <li>Developed the back-end server using Express, NodeJS andMongoDB</li>
            <li>Deployed the application to AWS and setup the internal VPCnetworking routes and SSL certificates</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  gap: 50px;
  text-align: justify;
  height: 400px;
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

.tab-content > div {
  display: none;
}

.tab-content > div.active {
  display: block;
}

.tab-content .company {
  margin-left: 5px;
  color: var(--color-primary);
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
