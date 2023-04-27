import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  // État
  state: () => ({
    correctAnswers: 0,
  }),

  // Getters
  getters: {
    // Vos getters ici
  },

  // Actions
  actions: {
    setCorrectAnswers(value: number) {
      this.correctAnswers = value;
    },
  },
});