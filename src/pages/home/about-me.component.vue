<template>
  <div id="about" class="section">
    <div class="heading">About Me</div>
    <div class="content">
      <div class="profile">
        <p>
          Hello! I'm Leander — an AI Engineer and Software Architect with 8+ years of experience, now focused on building production LLM
          systems: agentic workflow orchestration, retrieval-augmented generation, multi-provider model routing and context engineering at
          scale.
        </p>
        <p>
          Most recently I built <strong>Novel Forge</strong>, an AI platform that generates full-length novels — seven LangGraph workflows
          checkpointed to PostgreSQL so a crash mid-generation resumes at the last completed node, a judge model that catches continuity
          contradictions, and a repair loop that patches prose without touching a byte it shouldn't. It runs on a model router spanning
          Anthropic, OpenAI, xAI and local Ollama, with hybrid pgvector retrieval and per-call cost telemetry. I build and operate it alone,
          as part of a four-product TypeScript platform.
        </p>
        <p>
          That AI work sits on 8 years of distributed systems — from leading engineering at
          <a href="https://www.linkedin.com/company/phosphene-ai" target="_blank">an early-stage AI startup</a>, to building enterprise IAM
          serving millions of users at <a href="https://www.zoho.com" target="_blank">Zoho</a>, designing carbon footprint systems at
          <a href="https://wtvglobal.com" target="_blank">WTV</a>, and now building backend microservices for
          <a href="https://www.emiratesnbd.com/en" target="_blank">Emirates NBD</a>, one of the largest banks in the Middle East.
        </p>
        <p>
          Beyond my day job, I maintain several open-source libraries on npm and build full-stack applications from the ground up — from
          system design and architecture to frontend interfaces and deployment pipelines.
        </p>
        <p>Here are the technologies I work with:</p>
        <ul>
          <li>LangChain & LangGraph</li>
          <li>LlamaIndex & RAG</li>
          <li>pgvector & Embeddings</li>
          <li>Prompt Engineering</li>

          <li>Node & Bun</li>
          <li>TypeScript</li>
          <li>Java</li>
          <li>Python</li>

          <li>React</li>
          <li>Vue & Angular</li>
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
