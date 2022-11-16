import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext();

const AuthContext = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [change, setChange] = useState(false);

  useEffect(() => {
  async function getUser() {
    if(change){
      try {
        const response = await fetch(`http://localhost:5000/user/${user.user_id}`);
        const userData = await response.json();
        console.log('userData', userData);
        setChange(false);
      } catch (error) {
        console.log('UseEffect and update was not successful.', error.message)
      }
  }
  }
  getUser();
  }, []);


  const registration = () => {
    setIsLoggedIn(true);
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
    }

  return (
    <div>
      <authContext.Provider value={{ user, isLoggedIn, registration, login, logout, update }}>
        {props.children}
      </authContext.Provider>
    </div>
  )
}

export default AuthContext
