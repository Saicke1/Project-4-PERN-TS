import React from 'react';
import "./RatingStars.css";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const RatingStars = () => {
    const [stars, setStars] = React.useState(0);

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
