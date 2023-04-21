<template>
    <div class="quiz">
      <GameQuizSlide
        v-for="(game, index) in games"
        :key="index"
        :game="game"
        v-show="index === currentSlideIndex"
        :on-answer="onNextSlide"
        :on-skip="onNextSlide"
      ></GameQuizSlide>
    </div>
  </template>
  
<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import GameQuizSlide from './Slide.vue';
import { getRandomGames } from '../api/rawg';

export default defineComponent({
    name: 'GameQuiz',
  components: {
    GameQuizSlide,
  },
  setup() {
    const games = ref([]);
    const currentSlideIndex = ref(0);

    onMounted(async () => {
      games.value = await getRandomGames();
      console.log(games)
    });

    const onNextSlide = () => {
      currentSlideIndex.value++;
    };

    return {
      games,
      currentSlideIndex,
      onNextSlide,
    };
  },
});
</script>
  
  <style>
  /* ... */
  </style>