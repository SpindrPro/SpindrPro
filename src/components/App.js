import React, { useState } from 'react';
import MainPage from './mainPage';
import Playlist from './Playlist';
import Login from './login';
import axios from 'axios';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";


function App() {
  
  // A state that represents if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);
  // When login is clicked, redirects to spodify to sign in
  // const navigate = useNavigate();
  // const handleLoginClick = (e) => {    
  //   e.preventDefault();
  //   navigate('/home'); 
  // }

  // If user is logged in, return mainpage component
  // if (loggedIn) {
  //    return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path='/home' element={<MainPage/>}/>
  //         <Route path='/playlist' element={<Playlist />}/>
  //       </Routes>
  //     </BrowserRouter>
  //    )
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage user={"1234"}/>}/>
        {/* <Route path='/home' element={<MainPage/>}/> */}
        <Route path='/playlist' element={<Playlist user={"1234"}/>}/>
      </Routes>
    </BrowserRouter>
   );  
}

export default App;

