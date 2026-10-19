<script lang="ts" setup>
import { ABOUT_TEXT } from '@app/content';
</script>
<template>
  <div id="about" class="section">
    <h2 class="heading">About Me</h2>
    <div class="content">
      <div class="profile">
        <p>{{ ABOUT_TEXT }}</p>
      </div>
      <div class="photo">
        <img src="/images/me.jpeg" alt="Leander Paul" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  gap: 48px;
  color: var(--sh-text-secondary);
}

.photo {
  flex: 0 0 300px;
}

img {
  width: 100%;
  object-fit: cover;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .photo {
    flex-basis: auto;
  }
}
</style>
