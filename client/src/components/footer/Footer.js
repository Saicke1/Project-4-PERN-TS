import React, { useContext, useState } from "react";
import "./Footer.css";
import { authContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import HomeIcon from "@mui/icons-material/Home";
import LuggageIcon from "@mui/icons-material/Luggage";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
  

const Footer = () => {

  const { isLoggedIn, logout } = useContext(authContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    bottom: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 'auto', backgroundColor: "#b71e3f", color: "white" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List id="hamburgerBox">
        <div className="profilePosition">
          <h4>Profile</h4>
          {isLoggedIn ?
          <Link to="/profile" className="icons">
            <AccountBoxIcon fontSize="inherit" />
          </Link> :
          <Link to="/login" className="icons">
            <AccountBoxIcon fontSize="inherit" />
          </Link>}
        </div>

        {isLoggedIn ?
          <div className="profilePosition"><h4>Your Comments</h4>
          <Link to="/comments" className="icons">
            <CommentIcon fontSize="inherit" />
          </Link></div> : <></>}

          {isLoggedIn ?
          <div className="profilePosition"><h4>Favorites</h4>
          <Link to="/favorites" className="icons">
            <FavoriteIcon fontSize="inherit" />
          </Link></div> : <></>}
      </List>
      <Divider />
      <List id="hamburgerBox">
          {isLoggedIn ?
          <div className="profilePosition">
            <h4>Logout</h4>
            <Link to="/logout" className="icons" onClick={() => logout()}> 
              <LogoutIcon fontSize="inherit" />
            </Link>
          </div> :
          <div className="profilePosition">
            <h4>Login</h4>
            <Link to="/login" className="icons">
              <LoginIcon fontSize="inherit" />
            </Link>
          </div>}
      </List>
    </Box>
  );

  return (
    <div className="footerContainer">
      <div className="icons">
        <ReplyIcon onClick={() => navigate(-1)} fontSize="inherit" />
      </div>
      <Link to="/listHotels" className="icons">
        <LuggageIcon fontSize="inherit" />
      </Link>
      <Link to="/" className="icons">
        <HomeIcon fontSize="inherit" />
      </Link>
      <div>
        {['bottom'].map((anchor) => (
          <div key={anchor} className="icons">
            <MenuIcon onClick={toggleDrawer(anchor, true)} fontSize="inherit" />
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
