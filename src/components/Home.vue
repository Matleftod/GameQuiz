<template>
  <div class="container home">
    <h1 class="animated-title">GameQuiz</h1>
    <router-link class="start-button" to="/quiz">Commencer le quiz</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GameQuizHome',
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}
.animated-title {
  animation: grow-shrink 2s infinite ease-in-out;
}

@keyframes grow-shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.start-button {
  display: inline-block;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
}

.start-button:hover {
  background-color: #444444;
}
</style>