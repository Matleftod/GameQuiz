<template>
    <div class="quiz slide-container">
      <GameQuizSlide
        v-for="(game, index) in games"
        :key="index"
        :game="game"
        :slideIndex="currentSlideIndex"
        :isLastSlide="currentSlideIndex === games.length - 1"
        v-show="index === currentSlideIndex"
        :on-answer="onNextSlide"
        :on-skip="onNextSlide"
        :on-prev="onPrevSlide"
        :on-finish="handleFinish"
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
    });

    const onNextSlide = () => {
      currentSlideIndex.value++;
    };

    const onPrevSlide = () => {
      currentSlideIndex.value--;
    };

    const handleFinish = () => {
      console.log('finito');
    };

    return {
      games,
      currentSlideIndex,
      onNextSlide,
      onPrevSlide,
      handleFinish,
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