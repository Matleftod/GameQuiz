<template>
    <div class="gamelist">
        <div class="goback">
            <router-link class="home-button" to="/result">Retour</router-link>
        </div>
        <div class="listhead">
            <h2>Liste de tous les jeux</h2>
            <div class="search">
                <label for="search">Recherche :</label>
                <input
                id="search"
                type="text"
                v-model="searchTerm"
                @input="searchGames"
                />
            </div>
        </div>
      <div class="game-cards">
        <div v-for="game in games" :key="game.id" class="game-card">
          <img :src="game.screenshot" alt="Game Screenshot" />
          <div class="game-info">
            <h3>{{ game.name }}</h3>
            <p>Éditeur: {{ game.editor }}</p>
            <p>Plateforme: {{ game.platform }}</p>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button v-if="currentPage !== 1" @click="prevPage">Précédent</button>
        <button @click="nextPage">Suivant</button>
        </div>
        <div class="back-home">
      <router-link class="home-button" to="/">Retour à la page d'accueil</router-link>
    </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, ref, onMounted } from 'vue';
  import { getPopularGames } from '../api/rawg';
  import { Game } from '@/types';
  
  export default defineComponent({
    name: 'GameList',
    setup() {
        const games = ref<Game[]>([]);
        const searchTerm = ref('');
        const gamesPerPage = ref(12);
        const currentPage = ref(1);

        onMounted(async () => {
            games.value = await getPopularGames(gamesPerPage.value, currentPage.value);
        });

        const searchGames = async () => {
            games.value = await getPopularGames(gamesPerPage.value, currentPage.value, searchTerm.value);
        };

        const nextPage = async () => {
            currentPage.value++;
            searchGames();
        };

        const prevPage = async () => {
            currentPage.value--;
            searchGames();
        };
  
      return {
        searchTerm,
        games,
        searchGames,
        currentPage,
        nextPage,
        prevPage,
      };
    },
  });
  </script>
  
  <style scoped>

  .listhead{
    color: white;
    text-align: center;
}
  h2{
    font-size: 2.5em;
  }

  .search{
    margin-bottom: 20px;
  }
  .game-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
  
  .game-card {
    width: 300px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .game-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .game-info {
    padding: 16px;
  }
  
  .game-info p {
    margin: 4px 0;
  }

  .pagination{
    margin: 20px;
    display: flex;
    justify-content: space-between;
  }

  .back-home {
    margin: 20px;
    text-align: center;
    }
    .home-button {
  display: inline-block;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
}

.home-button:hover,  .back-button:hover{
  background-color: #444444;
}

.goback{
    margin: 20px;
}
  </style>
  