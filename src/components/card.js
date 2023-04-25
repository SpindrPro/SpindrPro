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


export default function Card() {


  const [lastDirection, setLastDirection] = useState();
  
  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name = 'left the screen!')
  }

  return (
    <div className='cardContainer'> 
      {images.map((img) => {
        return <TinderCard className='swipe' key={img} onSwipe={(dir) => swiped(dir, img)} onCardLeftScreen={() => outOfFrame(img)}>
          <div className='card' style={{backgroundImage: img}}>
          bob
          </div>
        </TinderCard>
      })
      }
      <button>Play</button>
    </div>
  )
}