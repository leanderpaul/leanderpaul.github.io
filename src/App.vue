<script lang="ts" setup>
import Navbar from './components/navbar.component.vue';
import Footer from './components/footer.component.vue';
</script>

<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
  <Footer />
</template>
<style scoped>
.container {
  display: flex;
  max-width: 1024px;
  min-height: calc(var(--sh-viewport-height) - 220px);
  margin: auto;
  padding: 70px 80px 0px 80px;
}

.container > * {
  flex: 1;
}

@media (max-width: 768px) {
  .container {
    min-height: calc(var(--sh-viewport-height) - 105px);
    max-width: 768px;
    padding: 70px 24px 0px 24px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    padding: 70px 100px 0px 100px;
  }
}
</style>
