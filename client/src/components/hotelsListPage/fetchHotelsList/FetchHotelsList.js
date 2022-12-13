import React, { useEffect, useState, useContext } from "react";
import "./FetchHotelsList.css";
import { Link } from "react-router-dom";
import FavIcon from "../../favoriteIcon/FavIcon";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { authContext } from "../../context/AuthContext";

const FetchHotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const { isLoggedIn } = useContext(authContext);

  //get all Hotels
  const getHotels = async () => {
    try {
      const response = await fetch("https://pern-delta.vercel.app/hotel/all");
      const jsonData = await response.json();
      const sortData = await jsonData.sort(
        (objA, objB) => Number(objA.hotelid) - Number(objB.hotelid)
      );
      setHotels(sortData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div>        
      <div className="CardPosition">
      {hotels.map((hotel) => {
            return (
      <Card sx={{ maxWidth: 345 }} key={hotel.hotelid}>
      <CardMedia
        component="img"
        height="140"
        image={hotel.hotelpicture}
        alt={hotel.hotelname}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {hotel.hotelname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Stars: {hotel.hotelstars} <StarIcon id="starIcon"/> <HorizontalRuleIcon/> Rooms: {hotel.hotelrooms}
        </Typography>
      </CardContent>
      <div className="cardAction">
        <Link to={`/details/${hotel.hotelid}`} className="linkStyle">
          <Button variant="contained" style={{ backgroundColor: "#b71e3f" }}>Show More</Button>
        </Link>
        {isLoggedIn ? <FavIcon id={hotel.hotelid}/> : <></>}
      </div>
    </Card>
    );
  })}
</div>
    </div>
  );
};

export default FetchHotelsList;
