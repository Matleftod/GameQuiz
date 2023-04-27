import axios from 'axios';

const apiKey = 'c043f5c788a7484bbc5faa7cbc26976d';

interface Game {
  id: number;
  name: string;
  screenshot: string;
  editor: string;
  platform: string;
}

async function getTotalGames(): Promise<number> {
  const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}`);
  return response.data.count;
}

export async function getRandomGames(limit = 30): Promise<Game[]> {
  const totalGames = await getTotalGames();
  const pageNumber = 1;//Math.floor(Math.random() * (totalGames / limit));
  const offset = pageNumber * limit;
  const minMetacriticScore = 50;

  const response = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&page_size=${limit}&page=${pageNumber}&ordering=-rating&metacritic.gte=${minMetacriticScore}&released.lte=${new Date().toISOString().split('T')[0]}`
  );

  const gamePromises = response.data.results.map(async (game: any) => {
    const gameId = game.id;
    const gameDetailsResponse = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`
    );

    const editor = gameDetailsResponse.data.publishers[0]?.name || 'Inconnu';
    const platform = gameDetailsResponse.data.platforms[0]?.platform.name || 'Inconnue';

    return {
      id: gameId,
      name: game.name,
      screenshot: game.background_image,
      editor,
      platform,
    };
  });

  const games = await Promise.all(gamePromises);
  return games;
}