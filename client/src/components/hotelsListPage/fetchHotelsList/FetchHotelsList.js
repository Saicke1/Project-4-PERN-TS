import React, { useEffect, useState } from "react";
import "./FetchHotelsList.css";
import { Link } from "react-router-dom";
import EditHotel from "../editHotel/EditHotel.js";
import FavIcon from "../favoriteIcon/FavIcon";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const FetchHotelsList = () => {
  const [hotels, setHotels] = useState([]);

  //delete function
  const deleteHotel = async (id) => {
    try {
      const deleteHotel = await fetch(`http://localhost:5000/hotel/${id}`, {
        method: "DELETE",
      });

      /* console.log(deleteHotel); */
      if (deleteHotel.ok) {
        /* setHotels(hotels.filter(each => each.hotelid !== id)); */
        getHotels();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //get all Hotels
  const getHotels = async () => {
    try {
      const response = await fetch("http://localhost:5000/hotel/all");
      const jsonData = await response.json();
      const sortData = await jsonData.sort(
        (objA, objB) => Number(objA.hotelid) - Number(objB.hotelid)
      );
      setHotels(sortData);
      console.log(jsonData);
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
        <FavIcon id={hotel.hotelid}/>
      </div>
    </Card>
    );
  })}
</div>
    </div>
  );
};

export default FetchHotelsList;
