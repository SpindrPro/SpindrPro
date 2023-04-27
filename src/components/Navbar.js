import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (<div className="Navbar">
    <Link to='/Home'>
        Home Page
    </Link>
    <Link to='/Playlist'>
        Liked Songs
    </Link>    
    </div>
  )
}

export default Navbar;