import React, { useState } from "react";
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import HomeIcon from "@mui/icons-material/Home";
import LuggageIcon from "@mui/icons-material/Luggage";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
  

const Footer = () => {

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
          <Link to="/registration" className="icons">
            <AccountBoxIcon fontSize="inherit" />
          </Link>
        </div>
      </List>
      <Divider />
      <List id="hamburgerBox">
      <div className="profilePosition">
          <h4>Logout</h4>
          <Link to="/logout" className="icons">
            <LogoutIcon fontSize="inherit" />
          </Link>
        </div>
      </List>
    </Box>
  );

  const navigate = useNavigate();

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
