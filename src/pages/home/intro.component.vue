<template>
  <div class="intro">
    <div class="title">Hi, I am Leander Paul</div>
    <div class="subtitle">A Full Stack Web Developer Building Digital Dreams One Line of Code at a Time and Bringing Websites to Life</div>
    <a class="btn" href="#projects">Projects</a>
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
  font-weight: 500;
  margin-bottom: 3rem;
}

.btn {
  width: 200px;
  padding: 12px;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
