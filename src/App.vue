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
  max-width: 1024px;
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

@media (max-width: 768px) {
  .container {
    max-width: 768px;
    padding: 0px 25px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    padding: 0px 100px;
  }
}
</style>
