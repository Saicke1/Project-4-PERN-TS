import React, { useContext, useState } from 'react';
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { authContext } from '../../context/AuthContext';

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(authContext);

  function handleSubmit(e){
    e.preventDefault();
  }

  const handleLogin = () => {
    login(email, password);
  }

  return (
    <div>
      Login Page
      <form onSubmit={handleSubmit}>
        <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <Link to="/profile">
          <button onClick={handleLogin}>Log In</button>
        </Link>
      </form>
    </div>
  )
}

export default LoginPage
