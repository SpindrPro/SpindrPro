import React, { useState, useEffect } from 'react';
import MainPage from './mainPage';
import Playlist from './Playlist';
import Login from './login';
import axios from 'axios';
import Cookies from 'js-cookie';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";


function App() {
  
  const [user, setUser] = useState('');

  async function getID(token) {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });  
      const userInfo = await response.json();
      console.log(userInfo);
      await axios.post("http://localhost:3000/user/find",{
        user_id: userInfo.id
      })
        .then(response => {
          console.log("response.data: ", response.data);
          if(response.data === true){
            setUser(userInfo.id);
          }
          else{
            axios.post("http://localhost:3000/user/create", {
              user_id: userInfo.id
            })
             .then(response => setUser(response.data))
          }
        })
    } catch (error) {
      console.log(`Error in getting user ID from Spotify: ${error}`);
    }
  };
  useEffect(() => {getID(Cookies.get("token"))}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<MainPage user={user} cookie={Cookies.get("token")}/>}/>
        <Route path='/playlist' element={<Playlist user={user}/>}/>
      </Routes>
    </BrowserRouter>
   );  
}

export default App;

