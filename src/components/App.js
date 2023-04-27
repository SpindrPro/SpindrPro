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
      //let token = Cookies.get("token");
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });  
      const userInfo = await response.json();
      console.log(userInfo);
      // make axios get request to database to the found enpoint
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
        // response to response .json
        // if data is true we setUser state to userId
        // else do post request to create new user
      

    } catch (error) {
      console.log(`Error in getting user ID from Spotify: ${error}`);
    }
  };
  useEffect(() => {getID(Cookies.get("token"))}, []);
  // A state that represents if user is logged in
  // const [loggedIn, setLoggedIn] = useState(false);
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
  // console.log(Cookies.get("token"))
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        {/* <Route path='/' element={<MainPage user={"1234"} cookie={Cookies.get("token")}/>}/> */}
        <Route path='/home' element={<MainPage user={user} cookie={Cookies.get("token")}/>}/>
        <Route path='/playlist' element={<Playlist user={user}/>}/>
      </Routes>
    </BrowserRouter>
   );  
}

export default App;

