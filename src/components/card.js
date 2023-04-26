import React, { useState,useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import TinderCard from 'react-tinder-card'

export default function Card(props) {
  const [lastDirection, setLastDirection] = useState();
  const [playingStatus, setPlayingStatus] = useState({});
  const audioRefs = useRef({});

  function togglePlay(trackId) {
    setPlayingStatus((prevState) => ({
      ...prevState,
      [trackId]: !prevState[trackId]
    }));
  };

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

  const swiped = async (direction, swipedTrack) => {
    console.log(direction)
    // // stop the audio if it's playing
    // console.log(swipedTrack.id)
    // console.log(playingStatus[swipedTrack.id])
    if (playingStatus[swipedTrack.id]) togglePlay(swipedTrack.id);
    // if card is swiped right, add track to db
    if (direction === 'right') {
      
      // send post request to backend to add a new song to user's fav
      try {
        const response = await fetch('http://localhost:3000/user/1234', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...swipedTrack, genre: props.genre})
        });
      } catch (error) {
        console.log("Failed to add to user's playlist: ", error)
      };
    };
    setLastDirection(direction)
  };

  const outOfFrame = (name) => {
    console.log(name = 'left the screen!')
  }

  function handleClick(e) {
    
  }

  const tracksArr = [];
  props.tracks.forEach(track => {
    tracksArr.push(<TinderCard className='swipe' key={track.id} onSwipe={(dir) => swiped(dir, track)} onCardLeftScreen={() => outOfFrame(track.id)} preventSwipe={['up', 'down']}>
          <div className='card container1' style={{backgroundImage: `url(${track.album.images[0].url})`}}>
          </div>
          {/* display track name, album name, and artist name */}
          <p>{track.name}</p>
          <p>{track.album.name}</p>
          <p>{track.artists[0].name}</p>
          <audio ref={(el) => (audioRefs.current[track.id] = el)} >
            <source src={track.preview_url}></source>
          </audio>
          <button onClick={() => togglePlay(track.id)}>{playingStatus[track.id]? 'Pause' : 'Play'}</button>
        </TinderCard>)
  })

  return (
    <div className='cardContainer'> 
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
  )
}