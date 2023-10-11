<template>
  <div>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <router-link class="btn" to="/">Go Home</router-link>
  </div>
</template>
<style scoped>
div {
  margin: auto;
  text-align: center;
  align-self: center;
}

h1 {
  font-size: 15rem;
  color: var(--color-primary);
  line-height: 1;
}

h2 {
  font-size: 3rem;
  font-weight: 400;
  color: var(--text-light);
}

.btn {
  margin-top: 2rem;
  padding: 12px 25px;
}
</style>
