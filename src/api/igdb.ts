import axios from 'axios';

const clientId = 'ulqvwkuiagmzigalq8qkmvhoya2cbf';
const clientSecret = 'f7asfrzo5xef7qoay8hc12lzx8si29';

async function getAccessToken() {
  const response = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
  );

  return response.data.access_token;
}

async function getRandomGames() {
  const accessToken = await getAccessToken();

  const response = await axios.get('https://api.igdb.com/v4/games', {
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`,
    },
    data: `
      fields name, cover.url, platforms.name, publishers.name, characters.name;
      where platforms != null & publishers != null & characters != null;
      limit 30;
      sort popularity desc;
    `,
  });

  return response.data;
}

export { getRandomGames };
