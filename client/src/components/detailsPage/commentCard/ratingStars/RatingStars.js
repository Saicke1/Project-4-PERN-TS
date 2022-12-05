import React, { useContext } from 'react';
import "./RatingStars.css";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { userCommentsContext } from '../../../context/CommentContext';

const RatingStars = () => {
  const { stars, setStars } = useContext(userCommentsContext);

  return (
    <div>
      <Box
      sx={{ paddingLeft: '24px' }}
    >
      <Rating
        name="simple-controlled"
        value={stars}
        onChange={(event, newStars) => {
          setStars(newStars);
        }}
      />
    </Box>
    </div>
  )
}

export default RatingStars
