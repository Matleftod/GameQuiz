import axios from 'axios';

const apiKey = 'c043f5c788a7484bbc5faa7cbc26976d';

interface Game {
  id: number;
  name: string;
  screenshot: string;
}

async function getTotalGames(): Promise<number> {
  const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}`);
  return response.data.count;
}

export async function getRandomGames(limit = 30): Promise<Game[]> {
    const totalGames = await getTotalGames();
    const pageNumber = Math.floor(Math.random() * (totalGames / limit));
    const offset = pageNumber * limit;
    const minMetacriticScore = 50; // Modifier selon vos préférences
  
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${apiKey}&page_size=${limit}&page=${pageNumber}&ordering=-rating&metacritic.gte=${minMetacriticScore}&released.lte=${new Date().toISOString().split('T')[0]}`
    );
  
    const games = response.data.results.map((game: any) => ({
      id: game.id,
      name: game.name,
      screenshot: game.background_image,
    }));
  
    return games;
}