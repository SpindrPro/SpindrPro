import React from "react";
import axios from "axios"

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
    <div id="login">
      <h1>Welcome to SpinderPro</h1>
      <button onClick={handleClick}>Login</button>
    </div>
  );
}
