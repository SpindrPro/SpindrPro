import React, { useState, useEffect } from "react";
import Card from "./card";
import axios from 'axios';

export default function MainPage(props){
  // state variable to store user inputted genre
  const [genre, setGenre] = useState("");
  const [tracks, setTracks] = useState([]);

  function handleChange(e) {
    setGenre(e.target.value);
  }
  // on button click fetch data from spotify
  // extract necessary props
  async function getTracks() {
    const url = `https://api.spotify.com/v1/recommendations?seed_genres=${genre}`;
    const headers = { Authorization: `Bearer BQDEZ1xE2KWohQaCwm7XyIlSTWHAZwWc9sbLAXiD_16lnonK090-tQSyUn1KQ06CZIDX_EtuYU2AKoAl1TEiJDCPSOxveWbP4WTEoDDP0Z20qgTEZ25_1C0xbYOyx4o4gSoriHDwwNyaYvIXY8ZvboffIp51X0hkWQTU0Uc1Vs34Z-Y7EL617TcF6w9jxQTUcf3V64AqN_D60kVQDAS78to` };
  
    try {
      const response = await axios.get(url, { headers });
      // console.log("response.data: ", response.data)
      console.log('response.data', response.data)
      setTracks(response.data.tracks.filter(track => track.preview_url !== null));
      console.log("songs:", songs)      
    } catch (err) {
      console.error('Error in getTracks:', err);
    }
  };

  useEffect(() => {
    console.log('Tracks state updated:', tracks);
  }, [tracks]);


  return(
    //div for flex container
  <div id="main-page-container">
    {/* //input tag */}
    <div className='container1' id='searchbar'>
      
      <input onChange={handleChange} placeholder="Enter Genre here"></input>
      <button id='searchbutton' onClick={getTracks}>Search</button>
    </div>
    <Card tracks={tracks}/>
   {/* //link button for playlist? */}
  </div>
   
  )
}

