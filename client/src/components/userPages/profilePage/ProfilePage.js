import React, { useContext, useState, useEffect } from "react";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import dummyPic from "../../../images/dummyImage.jpeg";
/* import { useAuth } from "../../context/AuthContext.tsx"; */

const ProfilePage = () => {

  /* const { user } = useContext(useAuth);

  if(user) {
    console.log('user', user);
  } */

  const { user, isLoggedIn, logout } = useContext(authContext);

  console.log('isLoggedIn', isLoggedIn);
  console.log('user from context on profile page', user);
  
  return <div>
    Profile Page
    <Link to="/update">
    <button>Update</button>
    </Link>
    <Link to="/logout">
      <button onClick={() => logout()}>Logout</button>
    </Link>
    {user && <div><p>There is a user {user.email}</p> <p>This is your nickname {user.nickname}</p>
    {user.picture ?
    <img alt="profilepic" src={user.picture} style={{ width: "150px", height: "150px" }}/> :
    <img alt="dummypic" src={dummyPic} style={{ width: "150px", height: "150px", borderRadius: "5px" }}/>}
    </div>}
  </div>;
};

export default ProfilePage;
