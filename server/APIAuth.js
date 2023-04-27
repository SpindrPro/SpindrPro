const express = require('express');
const app = express();
const crypto = require('crypto');
const base64url = require('base64url');
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config();

// Generate a code verifier and a code challenge
function generateCodeVerifier() {
    return base64url(crypto.randomBytes(32));
}

function generateCodeChallenge(codeVerifier) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(codeVerifier);
    return base64url(sha256.digest());
}

const codeVerifier = generateCodeVerifier();
const codeChallenge = generateCodeChallenge(codeVerifier);


// Generate the authorization URL
function generateAuthUrl(clientId, redirectUri, codeChallenge) {
    const baseUrl = 'https://accounts.spotify.com/authorize';
    const params = {
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      scope: 'user-read-private  user-read-email', // Add other scopes as needed
    };
    
    return `${baseUrl}?${querystring.stringify(params)}`;
  };

const clientId = process.env.CLIENT_ID; //OUR OWN CLIENT ID from .env file
const clientSecret = process.env.CLIENT_SECRET; //OUR OWN OWN CLIENT SECRET
const redirectUri = 'http://localhost:3000/callback';
const authUrl = generateAuthUrl(clientId, redirectUri, codeChallenge);
console.log(`Authorization URL: ${authUrl}`);

let accessToken = '';
app.get('/callback', async (req, res) => {
    try {
        const code = req.query.code;
        console.log("code: ", code)
        // Request access token using the authorization code
        const tokens = await requestAccessToken(clientId, redirectUri, codeVerifier, code);
        accessToken = tokens.access_token;
        console.log("accessToken: ", accessToken);
        res.send('Access token obtained successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during the authorization process');
      }
  });

// Exchange the code for an access token
async function requestAccessToken(clientId, redirectUri, codeVerifier, code) {
    let body = querystring.stringify({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      });
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            body: body,
          });
        const data = await response.json();
        return data;
      } catch(err) {
        console.log('Error in requestAccessToken. ERR:', err);
      };      
};


// Test making API calls to obtain artist data
async function getTracks(genres) {
    const url = `https://api.spotify.com/v1/recommendations?seed_genres=${genres}`;
    const headers = { Authorization: `Bearer BQB-0EhnJ1sIs7UzHJro_ORNUZN5niKmEZipth3iaKRI2A6ziPFZTlwlaZgQmr4u85l1pJGHU-CYn0u8mIbp8e5dOMW40dSzH0O_bM2Wy6w2YoAWezPTCwDkvP-zIcO1sXxJ71g4uWsFrTN2Xcs6RFNolOuos2SLscTYut8hWc8LN5KRV8KFv6qC9D8ik5ezMU3Id8EE_-Roed3GT8OkFvA` };
  
    try {
      const response = await axios.get(url, { headers });
      // console.log("response.data: ", response.data)
      return response.data;
    } catch (err) {
      console.error('Error in getArtistAlbums:', err);
    }
  }

// getTracks('pop,classical');

app.listen(3000, () => {
    console.log('App listening on port 3000');
  });