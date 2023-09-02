<template>
  <div id="app" @mousemove="updateCursor">
    <div id="cursor" :style="cursorStyle"></div>
    <div class="container">
      <h1>Leander Paul</h1>
      <div class="font-larger">Full Stack Developer</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      cursor: { x: 0, y: 0 }
    }
  },

  computed: {
    cursorStyle() {
      return {
        left: `${this.cursor.x}px`,
        top: `${this.cursor.y}px`
      }
    }
  },

  methods: {
    updateCursor(event: MouseEvent) {
      this.cursor = { x: event.clientX, y: event.clientY }
    }
  }
}
</script>
