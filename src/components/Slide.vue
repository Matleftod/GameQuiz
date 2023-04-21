<template>
    <div class="slide">
      <!-- Afficher l'indice principal -->
      <input type="text" v-model="userInput" placeholder="Entrez le titre du jeu">
      <button @click="submitAnswer">Soumettre</button>
      <button @click="skipQuestion">Passer</button>
  
      <!-- Afficher les indices -->
      <button @click="showHint">Afficher un indice supplémentaire</button>
      <div v-if="currentHintIndex >= 1">{{ hints[0] }}</div>
      <div v-if="currentHintIndex >= 2">{{ hints[1] }}</div>
      <!-- ... -->
    </div>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'GameQuizSlide',
    props: {
      game: Object,
      onAnswer: Function,
      onSkip: Function,
    },
    setup(props) {
      const userInput = ref('');
      const currentHintIndex = ref(0);
      const hints = ref(['Éditeur', 'Plateforme']); // Remplacer par les indices réels
  
      const submitAnswer = () => {
        if (props.onAnswer) {
          props.onAnswer(userInput.value);
        }
        userInput.value = '';
      };
  
      const skipQuestion = () => {
        if (props.onSkip) {
          props.onSkip();
        }
        userInput.value = '';
      };
  
      const showHint = () => {
        currentHintIndex.value++;
      };
  
      return {
        userInput,
        currentHintIndex,
        hints,
        submitAnswer,
        skipQuestion,
        showHint,
      };
    },
  });
  </script>
  
  <style>
  /* ... */
  </style>  