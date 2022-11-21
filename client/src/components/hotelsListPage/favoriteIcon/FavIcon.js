import React from 'react';
import "./FavIcon.css";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const FavIcon = () => {
  return (
    <div>
      <IconButton aria-label="favorite" size="large" id='iconButton'>
        <FavoriteBorderIcon fontSize="inherit"/>
      </IconButton>
    </div>
  )
}

export default FavIcon
