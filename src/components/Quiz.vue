<template>
    <div class="quiz">
      <slide
        v-for="(game, index) in games"
        :key="index"
        :game="game"
        v-show="index === currentSlideIndex"
        :on-answer="onNextSlide"
        :on-skip="onNextSlide"
      ></slide>
    </div>
  </template>
  
<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import Slide from './Slide.vue';
import { getRandomGames } from '../api/igdb';

export default defineComponent({
    name: 'GameQuiz',
  components: {
    Slide,
  },
  setup() {
    const games = ref([]);
    const currentSlideIndex = ref(0);

    onMounted(async () => {
      games.value = await getRandomGames();
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