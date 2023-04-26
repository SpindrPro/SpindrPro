import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import TinderCard from 'react-tinder-card'



const images = [
  'https://picsum.photos/400/600',
  'https://picsum.photos/401/601',
  'https://picsum.photos/402/602',
  'https://picsum.photos/403/603',
  'https://picsum.photos/404/604',
];


export default function Card(props) {


  const [lastDirection, setLastDirection] = useState();
  
  const swiped = (direction, nameToDelete) => {
    console.log(direction)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name = 'left the screen!')
  }

  function handleClick(e) {
    
  }

  const tracksArr = [];
  props.tracks.forEach(track => {
    tracksArr.push(<TinderCard className='swipe' key={track.id} onSwipe={(dir) => swiped(dir, track.id)} onCardLeftScreen={() => outOfFrame(track.id)} preventSwipe={['up', 'down']}>
          <div className='card container1' style={{backgroundImage: `url(${track.album.images[0].url})`}}>
          </div>
          {/* display track name, album name, and artist name */}
          <p>{track.name}</p>
          <p>{track.album.name}</p>
          <p>{track.artists[0].name}</p>
          <audio controls>
            <source src={track.preview_url}></source>
          </audio>
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