import axios from 'axios';

const apiKey = 'c043f5c788a7484bbc5faa7cbc26976d';

const rawgApi = axios.create({
  baseURL: 'https://api.rawg.io/api/',
});

export const getRandomGames = async () => {
  const fields = 'name,background_image,platforms.name,genres.name';
  const limit = 30;

  try {
    const response = await rawgApi.get('games', {
      params: {
        key: apiKey,
        ordering: '-rating',
        page_size: limit,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching games from RAWG:', error);
    return [];
  }
};