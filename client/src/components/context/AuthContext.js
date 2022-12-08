import React, { createContext, useState, useEffect } from 'react';

const url = "http://localhost:5000";

export const authContext = createContext();

const AuthContext = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const StorageItem = localStorage.getItem("token");

  //GET THE WHOLE PROFILE
  async function getName() {
    const fetchSettings = {
      method: "GET",
      headers: { token: localStorage.token }
    }
    try {
      const response = await fetch(`${url}/users/profile`, fetchSettings);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log('error.message', error.message);
      console.log("Server error, name couldn't be fetched.");
    }
  };

  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    if(localStorage.getItem("token")){
      console.log("Your token is still there.");
      setIsLoggedIn(true);
      console.log("UseEffect have set the loggin to true.");
    } else{
      console.log("The localstorage was erased.");
    }
  }, [StorageItem]);

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
    getName();
    setIsLoggedIn(true);
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
    getName();
    setIsLoggedIn(true);
    return { success, error }
  };

    //LOGOUT --------------------------------------------------------------------------------------------------------------
    const logout = () => {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.clear();
    };

    //UPDATE --------------------------------------------------------------------------------------------------------------
    const updateUser = async (nickname, picture, profiletext) => {
      try {
        const body = { nickname, picture, profiletext };
        const settings = {
          method: "PUT",
          headers: { "Authorization": `Bearer ${StorageItem}`, "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
        const response = await fetch(`http://localhost:5000/users/update`, settings);
        const jsonData = await response.json();
        getName();
      } catch (error) {
        console.log(error.message);
      } 
    }

  return (
    <div>
      <authContext.Provider value={{ user, isLoggedIn, registration, newlogin, logout, updateUser }}>
        {props.children}
      </authContext.Provider>
    </div>
  )
}

export default AuthContext
