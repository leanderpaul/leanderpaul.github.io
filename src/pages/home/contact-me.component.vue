<template>
  <div id="contact-me" class="section">
    <h3 class="heading">What's Next?</h3>
    <div class="content">
      <h1>Get In Touch</h1>
      <p>
        I'm currently open to Software Architect and Full Stack Developer roles. Whether you have an opportunity, a challenging project, or
        just want to connect — my inbox is always open.
      </p>
      <a href="mailto:leanderpaul97@gmail.com" class="btn">Say Hello</a>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
}

.heading {
  text-align: center;
  color: var(--color-primary);
}

h1 {
  font-size: 3.5rem;
}

p {
  max-width: 500px;
  text-align: center;
}

a {
  margin-top: 50px;
  width: 100px;
}

@media (max-width: 768px) {
  .content {
    margin-bottom: 125px;
  }

  h1 {
    font-size: 2.5rem;
  }
}
</style>
