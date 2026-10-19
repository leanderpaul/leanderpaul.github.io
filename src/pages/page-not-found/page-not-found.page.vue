<template>
  <div>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <router-link class="btn" to="/">Go Home</router-link>
  </div>
</template>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin: auto;
  text-align: center;
}

h1 {
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-hero);
  line-height: var(--sh-text-hero--line-height);
  font-weight: 500;
  color: var(--sh-accent-text);
}

h2 {
  margin-top: 16px;
  font-size: var(--sh-text-h1);
  line-height: var(--sh-text-h1--line-height);
  font-weight: 400;
  color: var(--sh-text-secondary);
}

.btn {
  margin-top: 32px;
}
</style>
