import React from "react";
import "./TopBanner.css";
import Typography from "@material-ui/core/Typography";
import cloud from "../../images/cloud.png";

const TopBanner = () => {
  return (
    <div className="topBannerContainer">
      <img src={cloud} alt="cloud" className="imageCLoud" />
      <Typography variant="h5" gutterBottom>
        Happy Hotels Heaven
      </Typography>
    </div>
  );
};

export default TopBanner;
