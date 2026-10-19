<script lang="ts" setup>
import AboutMe from './about-me.component.vue';
import ContactMe from './contact-me.component.vue';
import Experience from './experience.component.vue';
import FeaturedWork from './featured-work.component.vue';
import Hero from './hero.component.vue';
import OpenSource from './open-source.component.vue';
import ProofStrip from './proof-strip.component.vue';
import Skills from './skills.component.vue';
</script>

<template>
  <div>
    <Hero />
    <ProofStrip />
    <FeaturedWork class="band" />
    <Experience class="band" />
    <OpenSource class="band" />
    <Skills class="band" />
    <AboutMe class="band" />
    <ContactMe class="band" />
  </div>
</template>

<style scoped>
.band {
  max-width: none;
  margin: 0;
  padding: 64px 0;
  border-top: var(--sh-border-width) solid var(--sh-border-subtle);
}

@media (max-width: 768px) {
  .band {
    padding: 48px 0;
  }
}
</style>
