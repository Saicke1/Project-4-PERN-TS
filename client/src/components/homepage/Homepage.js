import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import HeaderCard from "./headerCard/HeaderCard";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CoronaBox from "./coronaBox/CoronaBox";
/* import { useAuth }  from "../context/AuthContextTS"; */

const Homepage = () => {

  /* const {loggedIn} = useAuth();

  console.log('loggedIn', loggedIn); */

  return (
    <div className="homepageContainer">
      <h3>Welcome to</h3>
      <HeaderCard/>
      <CoronaBox/>
      <Box
      sx={{
        width: 300,
        height: 'auto',
        backgroundColor: '#b71e3f',
        marginTop: '10px',
        borderRadius: '5px',
        color: 'white',
        padding: '10px',
      }}
    >
      <h2>How can you join?</h2>
      <p>Please register an account or sign in, if you have already one.</p>
      <p>Here at HHH, transparency and a friendly environment in our dealings with each other is important to us.</p>
      <p>We are looking forward to you.</p>
      <Link to="/registration" className="linkStyle">
      <Button variant="contained" style={{ backgroundColor: "#1EB796" }}>Sign Up</Button>
      </Link>
      <p>Got already an account?</p>
      <Link to="/login" className="linkStyle">
      <Button variant="contained" style={{ backgroundColor: "white", color: "#b71e3f" }}>Sign In</Button>
      </Link>
    </Box>
    </div>);
};

export default Homepage;
