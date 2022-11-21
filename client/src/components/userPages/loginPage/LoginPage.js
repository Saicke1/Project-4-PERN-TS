import React, { useContext, useState } from 'react';
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { authContext } from '../../context/AuthContext';

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, loginToken } = useContext(authContext);

  function handleSubmit(e){
    e.preventDefault();
  }

  const handleLogin = async () => {
    /* login(email, password); */
    const { success, error } = await loginToken(email, password)
        if (success) {
            /* navigate("/"); */
          console.log('user auf login page', user);
        }
        else {
            /* error && setValues({ ...values, error: error }) */
            console.log("An error occured while login.")
        }
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
        <Link to="/registration">
          <button>Have no Account yet?</button>
        </Link>
      </form>
    </div>
  )
}

export default LoginPage