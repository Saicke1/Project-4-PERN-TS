import React, { useEffect, useState } from "react";
import "./FetchHotelsList.css";
import { Link } from "react-router-dom";
import EditHotel from "../editHotel/EditHotel.js";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
      setHotels(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div className="listContainer">
      List of Hotels
      <table>
        <thead>
          <tr>
            <th>Hotel</th>
            <th>update</th>
            <th>Delete</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => {
            return (
              <tr key={hotel.hotelid}>
                <td>{hotel.hotelname}</td>
                <td>
                  <EditHotel hotel={hotel} />
                </td>
                <td>
                  <button onClick={() => deleteHotel(hotel.hotelid)}>
                    Delete me
                  </button>
                </td>
                <td>
                  <Link to={`/details/${hotel.hotelid}`}>
                    <button>Details</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/af/e6/77/exterior-view-top-vch.jpg?w=1100&h=-1&s=1"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
  );
};

export default FetchHotelsList;
