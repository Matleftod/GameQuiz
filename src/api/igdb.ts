import axios from "axios";

const igdbApi = axios.create({
  baseURL: "https://api.igdb.com/v4/",
  headers: {
    "Client-ID": "ulqvwkuiagmzigalq8qkmvhoya2cbf",
    Authorization: "Bearer f7asfrzo5xef7qoay8hc12lzx8si29",
    "Content-Type": "application/json",
  },
});

export const getRandomGames = async () => {
  const fields = "name,cover.url,platforms.name,genres.name";
  const limit = 30;

  const data = `
    fields ${fields};
    limit ${limit};
    where platforms != null & genres != null;
    sort popularity desc;
  `;

  try {
    const response = await igdbApi.post("games", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching games from IGDB:", error);
    return [];
  }
};
