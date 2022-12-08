import React, { useContext, useState } from 'react';
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { authContext } from '../../context/AuthContext';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from "@material-ui/core/Typography";
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { newlogin } = useContext(authContext);

  function handleSubmit(e){
    e.preventDefault();
  }

  const handleLogin = async () => {
    const { success, error } = await newlogin(email, password);
    if (success) {
      console.log("User is logged in successfully.");
    }
    else if(error){
      console.log("An error occured while login.")
    }
  }

  return (
    <div className='containerOverwrap'>
      <div className='loginContainer'>
        <Typography variant="h4" gutterBottom style={{ marginTop: "10px" }}>
        Good to see you again
        </Typography>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className='formBox' /* deklariert in RegistrationPage css */
          >
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormHelperText id="my-helper-text">* required</FormHelperText>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Button variant="contained" onClick={handleLogin} id="loginBtn">
              Sign In
            </Button>
          </Link>
          </Box>
          <Link to="/registration" style={{ textDecoration: "none", marginBottom: "10px" }}>
            Have no Account yet? Please Sign Up.
          </Link> 
      </div>
    </div>
  )
}

export default LoginPage
