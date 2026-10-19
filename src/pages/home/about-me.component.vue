<script lang="ts" setup>
import { ABOUT_TEXT } from '@app/content';
</script>
<template>
  <div id="about" class="section">
    <div class="heading">About Me</div>
    <div class="content">
      <div class="profile">
        <p>{{ ABOUT_TEXT }}</p>
      </div>
      <div>
        <img src="/images/me.jpeg" alt="Leander Paul" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  gap: 50px;
  text-align: justify;
}

.content a {
  color: var(--color-primary);
  background: linear-gradient(currentColor 0 0) var(--p, 0) 100% / var(--d, 0) 1px no-repeat;
  transition:
    0.3s,
    background-position 0s 0.3s;
}

.content a:hover {
  --d: 100%;
  --p: 100%;
}

img {
  border-radius: 5px;
  width: 300px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  img {
    width: 100%;
  }
}
</style>
