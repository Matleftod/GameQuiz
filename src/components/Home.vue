<template>
    <div class="home">
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
  
  <style>
  /* ... */
  </style>  