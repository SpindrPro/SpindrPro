import React from "react";
import axios from "axios";
import './login.css';

export default function Login(props) {

  function handleClick(){
    try{
      axios.get("http://localhost:3000/login")
      .then(response => {
        const authUrl = response.data
        window.location.href = authUrl
      })
      .catch(err => {
        console.log(err)
      })
    }
    catch(err){
      console.log("did not make connection to server", err)
    }
  }

  return (
    <div className="wrapper">
      <div className="login-container">
        <img src= "https://i.ibb.co/7Qjzq9H/spindr-Logo.png"/>
        {/* <h2>Please log in below to embark on an endless musical journey...</h2> */}
        <button className="login-button" onClick={handleClick}>Login</button>
      </div>
    </div>
  );
}
