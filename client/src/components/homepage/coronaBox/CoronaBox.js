import React from 'react';
import "./CoronaBox.css";
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const CoronaBox = () => {
  return (
      <div className="coronaBoxStyling">
        <div className="coronaBoxInsideStyling">
          <h5>Current Corona Warnings and Informations</h5>
          <IconButton style={{ color: 'white' }} aria-label="show Information">
            <PlayCircleOutlineIcon/>
          </IconButton>
        </div>
      </div>
  )
}

export default CoronaBox
