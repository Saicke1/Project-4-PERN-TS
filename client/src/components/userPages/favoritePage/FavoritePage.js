import React, { useContext, useEffect } from 'react';
import "./FavoritePage.css";
import MyTypography from "@material-ui/core/Typography";
import { userFavContext } from '../../context/FavoriteContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavIcon from '../../favoriteIcon/FavIcon';
import { Link } from "react-router-dom";

const Favoritepage = () => {
    const { getHotelDataFavs, hotelDataFavs } = useContext(userFavContext);

    useEffect(() => {
        getHotelDataFavs();
    }, []);
    
    console.log('hotelDataFavs', hotelDataFavs);

  return (
    <div className='favoriteContainer'>
        <MyTypography variant="h4" gutterBottom style={{ marginTop: "10px" }}>
            Your Favorites
        </MyTypography>
        <div className='FavoriteList'>
        {hotelDataFavs && hotelDataFavs.map((each, index) => {
        return (
                <Card sx={{ maxWidth: 345 }}>
                    <Link to={`/details/${each.hotelid}`} className="linkStyle" id={each.hotel_id}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={each.hotelpicture}
                        alt="hotelPic"
                    />
                    </Link>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {each.hotelname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <FavIcon id={each.hotelid}/>
                    </CardActions>
                </Card>
            )})}
        </div>
    </div>
  )
}

export default Favoritepage
