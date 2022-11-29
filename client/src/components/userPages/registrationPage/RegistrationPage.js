import React, { useContext, useState } from 'react';
import "./RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";
/* import { useAuth } from '../../context/AuthContext.tsx'; */
import { authContext } from '../../context/AuthContext';

const RegistrationPage = () => {

  /* const { loggedIn } = useContext(useAuth); */

  const { registration } = useContext(authContext);

  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      console.log('email', email);
      console.log('password', password);
      registration(nickname, email, password);
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      Registration Page
      <form>
        <input type="text" value={nickname} placeholder="User Name" onChange={(e) => setNickname(e.target.value)}/>
        <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleRegistration} type="submit">create Account</button>
      </form>
      <Link to="/login">
      <button>Have already an Account</button>
      </Link>
    </div>
  )
}

export default RegistrationPage
