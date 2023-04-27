<template>
    <div class="slide" :class="{ 'correct-answer': isAnswerCorrect }">
        <!-- Afficher l'indice principal -->
        <!--<h2>{{ game.name }}</h2>-->
        <img :src="game.screenshot" alt="Screenshot" v-if="game.screenshot" class="game-screenshot"/>
        <div class="error_msg">
          <div v-if="errorMessage">{{ errorMessage }}</div>
        </div>
        <div class="answer">
          <template v-if="!answerFound">
              <input type="text" v-model="userInput" placeholder="Entrez le titre du jeu">
              <button @click="submitAnswer">Valider</button>
            </template>
            <h2 v-else>{{ game.name }}</h2>
        </div>
        <div class="hint">
            <button class="hint_btn" @click="showHint">Indice</button>
            <div v-if="currentHintIndex >= 1">{{ hints[0] }}</div>
            <div v-if="currentHintIndex >= 2">{{ hints[1] }}</div>
        </div>
        <div class="buttons">
            <button v-if="!isFirstSlide" @click="lastQuestion">Précédente</button>

            <button v-if="!isLastSlide" @click="skipQuestion">Passer</button>
            <button v-else @click="finishQuiz">Terminer</button>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent, computed, toRefs } from 'vue';
  
  export default defineComponent({
    name: 'GameQuizSlide',
    props: {
      game: {
          type: Object,
          required: true,
      },
      onAnswer: Function,
      onSkip: Function,
      onPrev: Function,
      onFinish: Function,
      slideIndex: {
        type: Number,
        required: true,
      },
      isLastSlide: {
        type: Boolean,
        required: true,
      },
    },
    setup(props) {
      const userInput = ref('');
      const currentHintIndex = ref(0);
      const hints = ref([
        `Éditeur : ${props.game.editor}`,
        `Plateforme : ${props.game.platform}`,
      ]);      
      const answerFound = ref(false);

      const isFirstSlide = computed(() => {
        return props.slideIndex === 0;
      });

      const isAnswerCorrect = ref(false);
      const errorMessage = ref('');
  
      const submitAnswer = () => {
        if (userInput.value.toLowerCase() === props.game.name.toLowerCase()) {
          isAnswerCorrect.value = true;
          errorMessage.value = "";
          answerFound.value = true;
          if (props.onAnswer) {
            props.onAnswer(true);
          }
        } else {
          isAnswerCorrect.value = false;
          errorMessage.value = "La réponse est incorrecte. Veuillez réessayer.";
        }
        userInput.value = "";
      };
  
      const skipQuestion = () => {
        if (props.onSkip) {
          props.onSkip();
        }
      };

      const lastQuestion = () => {
        if (props.onPrev) {
          props.onPrev();
        }
      };
  
      const showHint = () => {
        currentHintIndex.value++;
      };

      const finishQuiz = () => {
        if (props.onFinish) {
          props.onFinish();
        }
      };
  
      return {
        userInput,
        currentHintIndex,
        hints,
        isFirstSlide,
        isAnswerCorrect,
        errorMessage,
        answerFound,
        submitAnswer,
        skipQuestion,
        lastQuestion,
        showHint,
        finishQuiz,
      };
    },
  });
  </script>
  
  <style scoped>
  .slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    color: white;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .game-screenshot {
    max-width: 100%;
    max-height: 400px;
    object-fit: cover;
  }
  img {
    width: 100%;
    max-width: 800px;
    height: auto;
    margin-bottom: 6rem;
  }
  
  button {
    flex: 1;
    margin: 0 0.5rem;
  }
.hint_btn, .error_msg, .answer, .hint{
  margin-bottom: 15px;
}
/*.error_msg{
}
.answer{
}
.hint{
}
.buttons{

}*/
  .correct-answer {
    color: green;
  }

  </style>