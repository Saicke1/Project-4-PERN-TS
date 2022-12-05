import React, { useContext } from 'react';
import "./LogoutPage.css";
import { Link } from "react-router-dom";
import { authContext } from '../../context/AuthContext';
import Typography from "@material-ui/core/Typography";
import Button from '@mui/material/Button';

const LogoutPage = () => {

  const { isLoggedIn } = useContext(authContext);

  console.log('isLoggedIn auf Logout Page', isLoggedIn)

  return (
    <div className='logoutOverwrap'>
      <div className='logoutContainer'>
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px", color: "white" }}>
        Thank you for using our App.
        </Typography>
        <Link to="/" className="linkStyle">
          <Button variant="contained" style={{ backgroundColor: "white", color: "#b71e3f" }}>Go to Homepage</Button>
        </Link>
        <Link to="/login" className="linkStyle">
          <Button variant="contained" style={{ backgroundColor: "#1EB796", marginBottom: "10px" }}>Go back to login</Button>
        </Link>
      </div>
    </div>
  )
}

export default LogoutPage
