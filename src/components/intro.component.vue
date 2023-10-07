<template>
  <div class="intro">
    <div class="title">Hey, I am Leander Paul</div>
    <div class="subtitle">A Full Stack Web Developer, Building Digital Dreams One Line of Code at a Time and Bringing Websites to Life</div>
    <a class="btn" href="">Projects</a>
  </div>
</template>
<style scoped>
.intro {
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  color: var(--text-lighter);
  font-size: 3rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 2rem;
}

.subtitle {
  max-width: 600px;
  text-align: center;
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 500;
  margin-bottom: 3rem;
}

.btn {
  width: 200px;
  padding: 12px;
}
</style>
