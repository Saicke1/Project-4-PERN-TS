import React, { useContext, useState } from 'react';
import "./RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from '../../context/AuthContext';
import Typography from "@material-ui/core/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import AlertInfo from '../../alertInfo/AlertInfo';

const RegistrationPage = () => {

  const { registration } = useContext(authContext);

  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerting, setAlerting] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setAlerting(false);
    if(password.length < 6){
      setAlerting(true);
      console.log("Password is too short.");
    } else {
      try {
        registration(nickname, email, password);
        navigate("/profile");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className='registerOverwrap'>
      {alerting && <AlertInfo text="Password is too short. It must be at least 6 characters long."/>}
      <div className='registerContainer'>
      <Typography variant="h4" gutterBottom style={{ marginTop: "10px" }}>
        Please Sign Up
        </Typography>
        <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
            component="form"
            className='formBox'
          >
            <TextField
            required
            id="outlined-required"
            label="username"
            placeholder=""
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="password"
            placeholder=""
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormHelperText id="my-helper-text">* required</FormHelperText>
          <Button variant="contained" onClick={handleRegistration} id="registerBtn">create Account</Button>
        </Box>
          

        
        <Link to="/login" style={{ textDecoration: "none", marginBottom: "10px" }}>
        Have already an Account?
        </Link>
      </div>
    </div>
  )
}

export default RegistrationPage
