import React from 'react';
import "./HeaderCard.css";
import HeavenPic from "../../../images/heaven.jpeg";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TypographyMine from "@material-ui/core/Typography";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const HeaderCard = () => {

  return (
    <div>
      <Card sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <TypographyMine variant="h5" gutterBottom>
                Happy Hotels Heaven
            </TypographyMine>
            <Divider id="divider" />
            <Typography variant="subtitle1" component="div">
            Berlin is a jungle of hotels.
            <br></br>
            Each has its own flair and preferences.
            <br></br>
            Together with other travelers you can exchange insider tips and experiences here.
            </Typography>
            </CardContent>
        </Box>
        <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={HeavenPic}
            alt="Live from space album cover"
        />
    </Card>
    </div>
  )
}

export default HeaderCard
