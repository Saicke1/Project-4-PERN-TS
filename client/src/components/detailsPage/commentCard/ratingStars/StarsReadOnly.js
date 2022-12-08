import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const StarsReadOnly = (props) => {
    const { rating } = props;
    
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating name="read-only" value={rating} readOnly />
    </Box>
  )
}

export default StarsReadOnly
