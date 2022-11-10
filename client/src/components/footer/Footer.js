import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LuggageIcon from "@mui/icons-material/Luggage";

const Footer = () => {
  return (
    <div className="footerContainer">
      <Link to="/" className="icons">
        <HomeIcon fontSize="inherit" />
      </Link>
      <Link to="/listHotels" className="icons">
        <LuggageIcon fontSize="inherit" />
      </Link>
    </div>
  );
};

export default Footer;
