import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Track from './Track';

const Playlist = (props) => {
    const [tracks, setTracks] = useState([]);

    // get request 
    async function getAllTracks() {
        try{
            const response = await fetch(`http://localhost:3000/user/${props.user}`);
            const data = await response.json();
            console.log(data);
            setTracks(data);
        } catch (error) {
            console.log(`Error when fetting all songs of the user: ${error}`);
        }        
    };
    useEffect(() => {getAllTracks()}, []);

    let trackArray = tracks.map(track => {
        return (<Track image={track.image} title={track.title} album={track.albumName} artist={track.artist} preview={track.preview}/>)
    });

    return (
      <div>
        <Navbar />
        <div>
        {trackArray}
        </div>
      </div>
    )
}

export default Playlist;