import React, { useContext, useEffect } from 'react';
import "./FavIcon.css";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { userFavContext } from '../context/FavoriteContext';

const FavIcon = (props) => {
  const { id } = props;
  const { favoriteIds, getMyFavorites, addFavorites, removeFavorite } = useContext(userFavContext);

  const removeFav = (id) => {
    removeFavorite(id);
  }

  const addFav = (id) => {
    addFavorites(id);
  }

  useEffect(() => {
    getMyFavorites();
  }, []);
  

  return (
    <div>
      {favoriteIds.includes(id) ? (
        <IconButton aria-label="favorite" size="large" id='iconButton' onClick={() => removeFav(id)}>
          <FavoriteIcon fontSize="inherit"/>
        </IconButton>
      ) : (
        <IconButton aria-label="favorite" size="large" id='iconButton' onClick={() => addFav(id)}>
          <FavoriteBorderIcon fontSize="inherit"/>
        </IconButton>
      )}
    </div>
  )
}

export default FavIcon
