import axios from "axios";

const apiKey = "c043f5c788a7484bbc5faa7cbc26976d";

interface Game {
  id: number;
  name: string;
  screenshot: string;
  editor: string;
  platform: string;
}

export async function getRandomGames(limit = 30): Promise<Game[]> {
  const page = Math.floor(Math.random() * (600 / limit)) + 1;

  const response = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${limit}`
  );

  const gamePromises = response.data.results.map(async (game: any) => {
    const gameId = game.id;
    const gameDetailsResponse = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`
    );

    const editor = gameDetailsResponse.data.publishers[0]?.name || "Inconnu";
    const platformNames = gameDetailsResponse.data.parent_platforms
      .map((parent_platform: any) => parent_platform.platform.name)
      .join(", ");

    return {
      id: gameId,
      name: game.name,
      screenshot: game.background_image,
      editor,
      platform: platformNames,
    };
  });

  const games = await Promise.all(gamePromises);
  return games;
}

export async function getPopularGames(
  limit = 12,
  page = 1,
  search = ""
): Promise<Game[]> {
  const response = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${limit}&search=${search}`
  );

  const gamePromises = response.data.results.map(async (game: any) => {
    const gameId = game.id;
    const gameDetailsResponse = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`
    );

    const editor = gameDetailsResponse.data.publishers[0]?.name || "Inconnu";
    const platformNames = gameDetailsResponse.data.parent_platforms
      .map((parent_platform: any) => parent_platform.platform.name)
      .join(", ");

    return {
      id: gameId,
      name: game.name,
      screenshot: game.background_image,
      editor,
      platform: platformNames,
    };
  });

  return Promise.all(gamePromises);
}
