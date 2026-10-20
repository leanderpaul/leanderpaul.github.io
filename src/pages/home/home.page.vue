<script lang="ts" setup>
import AboutMe from './about-me.component.vue';
import ContactMe from './contact-me.component.vue';
import Experience from './experience.component.vue';
import FeaturedWork from './featured-work.component.vue';
import Hero from './hero.component.vue';
import OpenSource from './open-source.component.vue';
import Skills from './skills.component.vue';
</script>

<template>
  <div class="home">
    <Hero />
    <Experience class="band" />
    <FeaturedWork class="band" />
    <OpenSource class="band" />
    <Skills class="band" />
    <AboutMe class="band" />
    <ContactMe class="band" />
  </div>
</template>

<style scoped>
.home {
  counter-reset: section;
}

.band {
  max-width: none;
  margin: 0;
  padding: 80px 0;
}

@media (max-width: 768px) {
  .band {
    padding: 56px 0;
  }
}
</style>
