import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import Card from "./card";
import axios from 'axios';
import Select from 'react-select';
import './mainPage.css'

export default function MainPage(props){
  // state variable to store user inputted genre
  const [genre, setGenre] = useState("");
  const [tracks, setTracks] = useState([]);

  function handleChange(selectedOption) {
      setGenre(selectedOption.value);
  }
  // on button click fetch data from spotify
  // extract necessary props
  async function getTracks() {
    const url = `https://api.spotify.com/v1/recommendations?seed_genres=${genre}`;
    const headers = { Authorization: `Bearer ${props.cookie}` };

    try {
      const response = await axios.get(url, { headers });
      // console.log("response.data: ", response.data)
      console.log('response.data', response.data)
      setTracks(response.data.tracks.filter(track => track.preview_url !== null));
      // console.log("songs:", songs)      
    } catch (err) {
      console.error('Error in getTracks:', err);
    }
  };

  useEffect(() => {
    console.log('Tracks state updated:', tracks);
  }, [tracks]);

  const genres = [
    "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"
  ];
  
  const genreOptions = genres.map(genre => {
    return { value: genre, label: genre[0].toUpperCase() + genre.slice(1) };
  });

  return(
    <div id="main-page-container">
      <Navbar/>
      <div className='genre-container'>
        <Select
          options={genreOptions}
          onChange={handleChange}
          placeholder="Search for a genre..."
        />
        {/* <input onChange={handleChange} placeholder="Enter Genre here"></input> */}
        <button className='genre-button' onClick={getTracks}>Search</button>
      </div>
      <Card user={props.user} tracks={tracks} genre={genre}/>
    </div>
  )
}

