<script lang="ts" setup>
import CursorHighligher from './components/cursor-highlighter.component.vue';
import Navbar from './components/navbar.component.vue';
import Footer from './components/footer.component.vue';
</script>

<template>
  <CursorHighligher />
  <Navbar />
  <div class="container">
    <router-view />
  </div>
  <Footer />
</template>
<style scoped>
.container {
  position: relative;
  z-index: 2;
  margin: auto;
  padding-top: 70px;
  min-height: calc(100vh - 220px);
  display: flex;
}

section {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container > * {
  flex: 1;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 720px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
</style>
