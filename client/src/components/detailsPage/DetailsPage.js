import React, { useState, useEffect } from "react";
import "./DetailsPage.css";
import TypographyMine from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavIcon from "../favoriteIcon/FavIcon";
import ListHotelDetails from "./listHotelDetails/ListHotelDetails";
import CommentCard from "./commentCard/CommentCard";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DetailsPage = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [hotel, setHotel] = useState([]);
  const { hotel_id } = useParams();
  const url = "http://localhost:5000";
  /* console.log('hotelId', hotel_id); */

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

useEffect(() => {
//get one Hotels
const getOneHotel = async () => {
  try {
    const response = await fetch(`${url}/hotel/${hotel_id}`);
    const jsonData = await response.json();
    /* console.log('jsonData', jsonData); */
    setHotel(jsonData);
  } catch (error) {
    console.log(error.message);
  }
};

  getOneHotel();
}, [hotel_id]);
  
/* console.log('hotel', hotel); */

  return (
    <div className="detailsContainer">
      <Card sx={{ maxWidth: 345 }}>
        {hotel ? (
            <div>
      <div className="headerCard">
        <TypographyMine variant="h3" gutterBottom className="HotelTitle">
          {hotel.hotelname}
        </TypographyMine>
        <div className="moreIcon">
          <IconButton aria-label="settings">
              <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <CardMedia
        component="img"
        height="194"
        image={hotel.hotelpicture}
        alt={hotel.hotelname}
      />
      <CardContent id="cardContentPosition">
        <ListHotelDetails hotel={hotel}/>
        <Typography variant="body2" color="text.secondary">
        Last rating:
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <FavIcon id={hotel.hotelid}/>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions></div> ) : <h1>No Data</h1>}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {hotel.hoteldescription}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>

    <CommentCard/>

    </div>);
};

export default DetailsPage;
