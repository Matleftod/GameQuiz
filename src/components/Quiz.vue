<template>
  <div class="quiz slide-container">
    <GameQuizSlide
      v-for="(game, index) in games"
      :key="index"
      :game="game"
      :slideIndex="currentSlideIndex"
      :isLastSlide="currentSlideIndex === games.length - 1"
      v-show="index === currentSlideIndex"
      :on-answer="onAnswer"
      :on-skip="onNextSlide"
      :on-prev="onPrevSlide"
      :on-finish="showResults"
    ></GameQuizSlide>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, Ref } from "vue";
import GameQuizSlide from "./Slide.vue";
import { getRandomGames } from "../api/rawg";
import router from "@/router";
import { useGameStore } from "../stores/gameStore";

interface Game {
  id: number;
  name: string;
  screenshot: string | null;
  editor: string;
  platform: string;
}

export default defineComponent({
  name: "GameQuiz",
  components: {
    GameQuizSlide,
  },
  setup() {
    const currentSlideIndex = ref(0);
    const completedSlides = ref<number[]>([]);
    const games: Ref<Game[]> = ref([]);
    const correctAnswers = ref(0);
    const gameStore = useGameStore();

    const loadGames = async () => {
      const randomGames = await getRandomGames();
    };

    onMounted(loadGames);

    onMounted(async () => {
      const randomGames = await getRandomGames();
      games.value = randomGames;
      gameStore.setGames(randomGames);
    });

    const onAnswer = (correct: boolean) => {
      if (correct) {
        completedSlides.value.push(currentSlideIndex.value);
        correctAnswers.value++;
      }
      if (currentSlideIndex.value !== games.value.length - 1) {
        onNextSlide();
      }
    };

    const onNextSlide = () => {
      currentSlideIndex.value++;
    };

    const onPrevSlide = () => {
      currentSlideIndex.value--;
    };

    const showResults = () => {
      const gameStore = useGameStore();
      gameStore.setCorrectAnswers(correctAnswers.value);
      router.push({
        name: "Result",
      });
    };

    return {
      games,
      currentSlideIndex,
      onAnswer,
      onNextSlide,
      onPrevSlide,
      showResults,
      completedSlides,
      correctAnswers,
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
