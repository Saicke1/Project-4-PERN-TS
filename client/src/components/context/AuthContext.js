import React, { createContext, useState, useEffect } from 'react';
/* import { redirect } from "react-router-dom"; */

const url = "http://localhost:5000";

export const authContext = createContext();

const AuthContext = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  async function getName() {
    const fetchSettings = {
      method: "GET",
      headers: { token: localStorage.token }
    }
    try {
      const response = await fetch(`${url}/users/profile`, fetchSettings);
      const data = await response.json();
      /* console.log('data', data); */
      setUser(data);
      if(data.length !== 0){
        return true
      } else {
        console.log("Wasn't able to catch name.")
        return false
      }
    } catch (error) {
      console.log('error.message', error.message);
      console.log("Server error, name couldn't be fetched.");
    }
  }

  useEffect(() => {
    const checkprofile = getName();
    if(checkprofile){
      setIsLoggedIn(true);
    } else {setIsLoggedIn(false);}
  }, []);

  useEffect(() => {
    if(localStorage.getItem("token")){
      console.log("Your token is still there.");
     /*  setUser(null);
      setIsLoggedIn(null);
      <redirect to="/" /> */
    } else{
      console.log("The localstorage was erased.");
    }
  }, [localStorage.getItem("token")])
  
  

  //REGISTRATION --------------------------------------------------------------------------------------------------------
  const registration = async (nickname, email, password) => {
    const fetchSettings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, email, password })
    }
    const res = await fetch(`${url}/users/signup`, fetchSettings);
    /* in res.json() wird durch backend wird bestimmt, dass ich success, email und jwt bekomme*/
    const { success, error, jwt } = await res.json();
    localStorage.setItem("token", jwt);
    /* setUser({ email }); */
    const checkprofile = await getName();
    if(checkprofile){
      setIsLoggedIn(true);
    } else {setIsLoggedIn(false);}
    return { success, error }
  };

  //LOGIN -----------------------------------------------------------------------------------------------------------------
  const newlogin = async (email, password) => {
    const fetchSettings = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }
    const res = await fetch(`${url}/users/login`, fetchSettings);
    const { success, error, token } = await res.json();
    localStorage.setItem("token", token);
    const checkprofile = await getName();
    if(checkprofile){
      setIsLoggedIn(true);
    } else {setIsLoggedIn(false);}
    return { success, error }
  };

    /* const loginToken = async (email, password) => {
    const fetchSettings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
    let userData = [];
    const res = await fetch(`${url}/user/all/login`, fetchSettings);
    const { success, token, error, useremail, usernickname, userpicture, usertext, userid, loggedUser } = await res.json();
    localStorage.setItem("jwt", token);
    let createObjectStorage = { useremail, usernickname, userpicture, usertext, userid }
    userData.push(createObjectStorage);
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(loggedUser);
    return { success, error }
    }
 */

    //LOGOUT --------------------------------------------------------------------------------------------------------------
    const logout = () => {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.clear();
    };

    //UPDATE --------------------------------------------------------------------------------------------------------------
    const update = async (nickname) => {
      try {
        const body = { nickname };
        const response = await fetch(`http://localhost:5000/user/${user.user_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (error) {
        console.log(error.message);
      } 
      /* getUser(); */
      setUser({ ...user, nickname: nickname });
    }

  return (
    <div>
      <authContext.Provider value={{ user, isLoggedIn, registration, newlogin, /* loginToken, */ logout, update }}>
        {props.children}
      </authContext.Provider>
    </div>
  )
}

export default AuthContext
