import React, { useContext } from 'react';
import "./LogoutPage.css";
import { Link } from "react-router-dom";
import { authContext } from '../../context/AuthContext';

const LogoutPage = () => {

  const { isLoggedIn } = useContext(authContext);

  console.log('isLoggedIn auf Logout Page', isLoggedIn)

  return (
    <div>
      Logout Page
      <Link to="/">
        <button>Go to Homepage</button>
      </Link>
      <Link to="/login">
        <button>Go back to login</button>
      </Link>
    </div>
  )
}

export default LogoutPage
