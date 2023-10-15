<template>
  <div id="contact-me" class="section">
    <h3 class="heading">What's Next?</h3>
    <div class="content">
      <h1>Get In Touch</h1>
      <p>
        Feel free to contact to me for any projects or opportunities, my inbox is always open. Whether you have a question or just want to
        say hi, I'll try my best to get back to you!
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
