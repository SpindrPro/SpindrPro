const express = require("express");
const authRouter = express.Router();
const crypto = require('crypto');
const base64url = require('base64url');
const querystring = require('querystring');
const path = require('path');
require("dotenv").config();

codeVerifierStorage = {}

const clientId = 'd9584ec6374c4119a19d2bea2b63f583'; //OUR OWN CLIENT ID from .env file
// const clientSecret = '31a08531ecb542ef8b4311bf85040ed5'; //OUR OWN OWN CLIENT SECRET
const redirectUri = 'http://localhost:3000/callback';

authRouter.get("/login", (req, res) => {
    console.log('I AM IN AUTHROUTER')
    function generateCodeVerifier() {
        return base64url(crypto.randomBytes(32));
    }
    console.log("I am HERE")
    function generateCodeChallenge(codeVerifier) {
        const sha256 = crypto.createHash('sha256');
        sha256.update(codeVerifier);
        return base64url(sha256.digest());
    }
    
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    codeVerifierStorage.codeVerifier = codeVerifier
    
   
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
    console.log("I am after generateAuthURL")
    

    const authUrl = generateAuthUrl(clientId, redirectUri, codeChallenge);
    console.log(`Authorization URL: ${authUrl}`);

    return res.status(200).json(authUrl)
  });




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

  authRouter.get('/callback', async (req, res) => {
    try {
        const code = req.query.code;
        console.log("code: ", code)
        // Request access token using the authorization code
        const tokens = await requestAccessToken(clientId, redirectUri, codeVerifierStorage.codeVerifier, code);
        accessToken = tokens.access_token;
        console.log("accessToken: ", accessToken);
        res.cookie('token', accessToken);
        // res.send({accessToken});
        res.redirect('http://localhost:8080/home')
      } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during the authorization process');
      }
  });

module.exports = authRouter;