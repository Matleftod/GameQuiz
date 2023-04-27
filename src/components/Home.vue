<template>
    <div class="container home">
      <h1>Quiz sur les jeux vidéo</h1>
      <router-link to="/quiz">Commencer le quiz</router-link>
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
</style>