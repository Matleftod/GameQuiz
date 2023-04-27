<template>
    <div class="quiz slide-container">
      <GameQuizSlide
        v-for="(game, index) in games"
        :key="index"
        :game="game"
        v-show="index === currentSlideIndex"
        :on-answer="onNextSlide"
        :on-skip="onNextSlide"
        :on-prev="onPrevSlide"
      ></GameQuizSlide>
    </div>
  </template>
  
<script lang="ts">
import { ref, defineComponent, onMounted, Ref } from 'vue';
import GameQuizSlide from './Slide.vue';
import { getRandomGames } from '../api/rawg';

interface Game {
  id: number;
  name: string;
  screenshot: string | null;
}

export default defineComponent({
    name: 'GameQuiz',
  components: {
    GameQuizSlide,
  },
  setup() {
    const currentSlideIndex = ref(0);

    const games: Ref<Game[]> = ref([]);

    onMounted(async () => {
      games.value = await getRandomGames();
      console.log(games.value);
    });

    const onNextSlide = () => {
      currentSlideIndex.value++;
    };

    const onPrevSlide = () => {
      currentSlideIndex.value--;
    };

    return {
      games,
      currentSlideIndex,
      onNextSlide,
      onPrevSlide,
    };
  },
});
</script>
  
<style scoped>
.quiz {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.slide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>