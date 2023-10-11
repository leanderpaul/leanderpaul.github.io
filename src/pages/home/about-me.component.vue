<template>
  <div id="about" class="section">
    <div class="heading">About Me</div>
    <div class="content">
      <div class="profile">
        <p>
          Hello! My name is Leander and I enjoying creating applications for the web. My interest in web development started back in 2018
          when I learnt about web development using NodeJS in a bootcamp. I have been learning and building web applications ever since.
        </p>
        <p>
          Fast-forward to today, and I've had the privilege of working at
          <a href="https://www.linkedin.com/company/phosphene-ai" target="_blank">a startup</a>,
          <a href="https://wtvglobal.com" target="_blank">a mid-size company</a>, and
          <a href="https://www.zoho.com" target="_blank">a huge corportaion</a>. My main focus these days is building full stack web
          applications that are able to scale and perform well.
        </p>
        <p>
          I also recently started developing a few microservices for my own personal use using Node, React, Vue, Angular, Astro & MongoDB.
        </p>
        <p>Here are some of the technologies I am proficient in:</p>
        <ul>
          <li>Node</li>
          <li>React</li>
          <li>Angular</li>
          <li>Vue</li>
          <li>SQL</li>
          <li>MongoDB</li>
          <li>Java</li>
          <li>Rust</li>
          <li>Docker</li>
          <li>Bash</li>
          <li>AWS</li>
          <li>REST & GraphQL APIs</li>
        </ul>
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

ul {
  padding-left: 20px;
  columns: 3;
}
</style>
