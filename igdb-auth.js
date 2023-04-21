const axios = require('axios');

async function getAccessToken(clientId, clientSecret) {
    try {
      const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
}

(async () => {
    const clientId = 'ulqvwkuiagmzigalq8qkmvhoya2cbf';
    const clientSecret = 'f7asfrzo5xef7qoay8hc12lzx8si29';
  
    const authData = await getAccessToken(clientId, clientSecret);
    console.log(authData);
})();
/*  
{
    access_token: 't0hs6r62t580f1u0ve0rzl2tqt8l7j',
    expires_in: 5173970,
    token_type: 'bearer'
}*/