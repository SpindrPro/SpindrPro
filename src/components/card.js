import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import TinderCard from "react-tinder-card";
import "./card.css";

export default function Card(props) {
  const [lastDirection, setLastDirection] = useState();
  const [playingStatus, setPlayingStatus] = useState({});
  const audioRefs = useRef({});

  function togglePlay(trackId) {
    setPlayingStatus((prevState) => ({
      ...prevState,
      [trackId]: !prevState[trackId],
    }));
  }

  useEffect(() => {
    Object.entries(playingStatus).forEach(([trackId, isPlaying]) => {
      const audioElement = audioRefs.current[trackId];
      if (audioElement) {
        if (isPlaying) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
    });
  }, [playingStatus]);

  const stopPlay = async (tracKID) => {
    setPlayingStatus((prevState) => ({
      ...prevState,
      [tracKID]: false,
    }));
  };

  const swiped = async (direction, swipedTrack) => {
    console.log(direction);
    // // stop the audio if it's playing
    // console.log(playingStatus[swipedTrack.id]);
    // if (playingStatus[swipedTrack.id]) togglePlay(swipedTrack.id);
    // if card is swiped right, add track to db
    if (direction === "right") {
      // send post request to backend to add a new song to user's fav
      try {
        console.log("USER", props.user);
        const response = await fetch(
          `http://localhost:3000/user/${props.user}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...swipedTrack, genre: props.genre }),
          }
        );
      } catch (error) {
        console.log("Failed to add to user's playlist: ", error);
      }
    }
    setLastDirection(direction);
  };

  const outOfFrame = (tracks) => {
    console.log("left the screen!");
    stopPlay(tracks);
  };

  function handleClick(e) {}

  const tracksArr = [];
  props.tracks.forEach((track) => {
    tracksArr.push(
      <TinderCard
        className="swipe"
        key={track.id}
        onSwipe={(dir) => swiped(dir, track)}
        onCardLeftScreen={() => outOfFrame(track.id)}
        preventSwipe={["up", "down"]}
      >
        <div className="song-container">
          <div className="song">
            <div className="songfront songface">
              <img src={track.album.images[0].url} />
            </div>
            <div class="songback songface">
              <h1>{track.name}</h1>
              <p>{track.artists[0].name}</p>
              <p>{track.album.name}</p>
              <audio ref={(el) => (audioRefs.current[track.id] = el)}>
                <source src={track.preview_url}></source>
              </audio>
              <button
                className="play-button"
                onClick={() => togglePlay(track.id)}
              >
                {playingStatus[track.id] ? "Pause" : "Play"}
              </button>
            </div>
          </div>
        </div>
        {/* <div className='card face' style={{backgroundImage: `url(${track.album.images[0].url})`}}>
          </div>
          <div className='back face' style={{backgroundColor: 'black'}}>
            <p style={{color: 'white', textAlign: 'center'}}>{track.name}</p>
            <p style={{color: 'white', textAlign: 'center'}}>{track.album.name}</p>
            <p style={{color: 'white', textAlign: 'center'}}>{track.artists[0].name}</p>
            <audio ref={(el) => (audioRefs.current[track.id] = el)} >
              <source src={track.preview_url}></source>
            </audio>
            <button onClick={() => togglePlay(track.id)}>{playingStatus[track.id]? 'Pause' : 'Play'}</button>
          </div> */}
      </TinderCard>
    );
  });

  return (
    <div className="cardContainer">
      {/* {props.tracks.map((track) => {
        return <TinderCard className='swipe' key={track.id} onSwipe={(dir) => swiped(dir, img)} onCardLeftScreen={() => outOfFrame(img)} preventSwipe={['up', 'down']}>
          <div className='card container1' style={{backgroundImage: `url(${track.album.images[0].url})`}}>
          </div>
          <p>{track.name}</p>
          <p>{track.album.name}</p>
          <p>{track.artists[0].name}</p>
          <button id='playButton'>Play</button>
        </TinderCard>
      })
      }   */}
      {tracksArr}
    </div>
  );
}
