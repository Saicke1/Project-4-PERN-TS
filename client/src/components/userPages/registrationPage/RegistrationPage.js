import React, { useContext, useState } from 'react';
import "./RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";
/* import { useAuth } from '../../context/AuthContext.tsx'; */
import { authContext } from '../../context/AuthContext';
import Typography from "@material-ui/core/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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
    <div className='registerOverwrap'>
      <div className='registerContainer'>
      <Typography variant="h4" gutterBottom style={{ marginTop: "10px" }}>
        Please Sign Up
        </Typography>

        <form className="formRegisterStyle">
        <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
          >
            <TextField
            id="filled-basic"
            label="username"
            placeholder=""
            multiline
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="email"
            placeholder=""
            multiline
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="password"
            placeholder=""
            multiline
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
          <Button variant="contained" onClick={handleRegistration} id="registerBtn">create Account</Button>
        </form>
        
        <Link to="/login" style={{ textDecoration: "none", marginBottom: "10px" }}>
        Have already an Account?
        </Link>
      </div>
    </div>
  )
}

export default RegistrationPage
