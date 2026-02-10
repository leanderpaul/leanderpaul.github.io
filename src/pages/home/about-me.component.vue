<template>
  <div id="about" class="section">
    <div class="heading">About Me</div>
    <div class="content">
      <div class="profile">
        <p>
          Hello! I'm Leander — a Software Architect and Full Stack Developer with 8+ years of experience designing and building
          production-grade distributed systems. I've architected microservice platforms, IAM systems, and event-driven architectures that
          serve millions of users across banking, SaaS, and climate-tech domains.
        </p>
        <p>
          I've had the privilege of working across diverse environments — from leading engineering at
          <a href="https://www.linkedin.com/company/phosphene-ai" target="_blank">an early-stage startup</a>, to building enterprise IAM at
          <a href="https://www.zoho.com" target="_blank">Zoho</a>, designing carbon footprint systems at
          <a href="https://wtvglobal.com" target="_blank">WTV</a>, and now architecting backend microservices for
          <a href="https://www.emiratesnbd.com/en" target="_blank">Emirates NBD</a>, one of the largest banks in the Middle East.
        </p>
        <p>
          Beyond my day job, I maintain several open-source libraries on npm and build full-stack applications from the ground up — from
          system design and architecture to frontend interfaces and deployment pipelines.
        </p>
        <p>Here are the technologies I work with:</p>
        <ul>
          <li>Node & Bun</li>
          <li>Java</li>
          <li>Rust</li>
          <li>Python</li>

          <li>TypeScript</li>
          <li>React</li>
          <li>Angular</li>
          <li>Vue</li>

          <li>SQL & MongoDB</li>
          <li>Redis & RabbitMQ</li>
          <li>Docker & AWS</li>
          <li>System Design</li>
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

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  img {
    width: 100%;
  }

  ul {
    columns: 2;
  }
}
</style>
