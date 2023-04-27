<template>
  <div class="result">
    <h2>Vous avez répondu correctement à {{ correctAnswers }} jeux sur 30.</h2>
    <button @click="goToGameList">Voir tous les jeux</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGameStore } from '../stores/gameStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'QuizResult',
  setup() {
    const gameStore = useGameStore();
    const correctAnswers = computed(() => gameStore.correctAnswers);
    const router = useRouter();

    const goToGameList = () => {
      router.push({
        name: 'GameList',
      });
    };

    return {
      correctAnswers,
      goToGameList,
    };
  },
});
</script>

<style scoped>
.result{
  color: white;
}
</style>