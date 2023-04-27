import React, { useState, useEffect } from 'react';
import './Track.css';

const Track = (props) => {
    return (
      <div className="track-container">
        <div className="track">
          <div className="front face">
            <img src={props.image}/>
          </div>
          <div class="back face">
            <h1>{props.title}</h1>
            <p>{props.artist}</p>
            <p>{props.album}</p>
            <audio controls className="audio">
                <source src={props.preview}></source>
            </audio>
          </div>
        </div>
      </div>
    )
}

export default Track;