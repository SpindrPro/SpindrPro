import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (<div className="Navbar">
    <Link to='/Home'>
        Home page
    </Link>
    <Link to='/Playlist'>
        Your Playlist
    </Link>    
    </div>
  )
}

export default Navbar;