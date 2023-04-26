import React, { useState, useEffect } from 'react';
import './Track.css';

const Track = (props) => {
    return (
      <div className="song">
        <img src={props.image}/>
        <p>{props.title}</p>
        <p>{props.album}</p>
        <p>{props.artist}</p>
        <audio controls>
          <source src={props.preview}></source>
        </audio>
      </div>
    )

}

export default Track;