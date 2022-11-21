import React, { createContext, useState, useEffect } from 'react';

const url = "http://localhost:5000";

export const authContext = createContext();

const AuthContext = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

 
 /*  async function getUser() {
      try {
        const response = await fetch(`http://localhost:5000/user/${user.user_id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.log('Update was not successful.', error.message)
      }
  }; */


  const registration = async (email, password) => {
    const fetchSettings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    }
    const res = await fetch(`${url}/user/all/signup`, fetchSettings);
    /* in res.json() wird durch backend wird bestimmt, dass ich success, email und jwt bekomme*/
    const { success, error, jwt } = await res.json();
    localStorage.setItem("jwt", jwt);
    /* setUser({ email }); */
    setIsLoggedIn(true);
    return { success, error }
  };

    const login = async (email, password) => {
      try {
        const response = await fetch("http://localhost:5000/user/all");
        const jsonData = await response.json();
        jsonData.forEach(each => {
          if (each.email === email && each.password === password){
            console.log('each', each);
            setUser(each);
            setIsLoggedIn(true);
            console.log("It is a match.");
          }
        });
        
        /* console.log('jsonData from context', jsonData); */
      } catch (error) {
        console.log(error.message);
      } 
    };

    const loginToken = async (email, password) => {
    const fetchSettings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
    const res = await fetch(`${url}/user/all/login`, fetchSettings);
    const { success, token, error, loggedUser } = await res.json();
    localStorage.setItem("jwt", token);
    setIsLoggedIn(true);
    setUser(loggedUser);
    return { success, error }
    }

    const logout = () => {
      setUser(null);
      setIsLoggedIn(false);
    };

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
      <authContext.Provider value={{ user, isLoggedIn, registration, login, loginToken, logout, update }}>
        {props.children}
      </authContext.Provider>
    </div>
  )
}

export default AuthContext
