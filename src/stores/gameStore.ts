import { defineStore } from 'pinia';
import { Game } from '@/types';

export const useGameStore = defineStore('game', {
  // État
  state: () => ({
    correctAnswers: 0,
    games: [] as Game[],
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
    setGames(games: Game[]) {
      this.games = games;
    },
  },
});