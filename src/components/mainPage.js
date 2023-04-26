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
    const headers = { Authorization: `Bearer BQCWgiT1sdRNdDggEEvk8c3HTcyskISsmWOaETLU3Dr8VWx3efJ0o5vJgv5LtyGTAynVHYa3_hnYtCkvdtMg6M3BZva_7wMb87VidrPXIWjAcWbSKk0cTaFO0UItASKT46ndCNz6W7q-HFu9fVu7uVxi0HOXmf0VqzHnotH4jdCMXsVI8Ax2Jfj_8U3cpLVqb3BZC4ohF_5AHx2FmkT0Fsg` };
  
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


  return(
    //div for flex container
  <div id="main-page-container">
    {/* //input tag */}
    <div className='container1' id='searchbar'>
      
      <input onChange={handleChange} placeholder="Enter Genre here"></input>
      <button id='searchbutton' onClick={getTracks}>Search</button>
    </div>
    <Card tracks={tracks} genre={genre}/>
   {/* //link button for playlist? */}
  </div>
   
  )
}

