<template>
  <div class="result">
    <h2>Vous avez répondu correctement à {{ correctAnswers }} jeux sur 30.</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGameStore } from '../stores/gameStore';

export default defineComponent({
  name: 'QuizResult',
  setup() {
    const gameStore = useGameStore();
    const correctAnswers = computed(() => gameStore.correctAnswers);

    return {
      correctAnswers,
    };
  },
});
</script>
<style scoped>
.result{
  color: white;
}
</style>