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
import StarIcon from '@mui/icons-material/Star';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

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
                <Card sx={{ maxWidth: 345 }} key={each.fav_id}>
                    <Link to={`/details/${each.hotelid}`} className="linkStyle">
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
                        Stars: {each.hotelstars} <StarIcon id="starIcon"/> <HorizontalRuleIcon/> Rooms: {each.hotelrooms}
                        </Typography>
                    </CardContent>
                    <CardActions className='cardActionPosition'>
                        <FavIcon id={each.hotelid}/>
                        <div className="blobs-container">
                            <div className="blob red">Click on the Picture for more informations.</div>
                        </div>
                    </CardActions>
                </Card>
            )})}
        </div>
    </div>
  )
}

export default Favoritepage
