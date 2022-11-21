import React from 'react';
import "./ListHotelDetails.css";
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import ConstructionIcon from '@mui/icons-material/Construction';
import HotelIcon from '@mui/icons-material/Hotel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const ListHotelDetails = (props) => {
    const { hotel } = props;

    console.log('hotel data on list page', hotel);
  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem id="listGap">
        <ListItemAvatar>
          <Avatar id="iconColor">
            <HouseSidingIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Year of manufacture" secondary={hotel.year_of_manufacture} />
      </ListItem>
      <ListItem id="listGap">
        <ListItemAvatar>
          <Avatar id="iconColor">
            <ConstructionIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Last partial or total renovation" secondary={hotel.renovation_date} />
      </ListItem>
      <ListItem id="listGap">
        <ListItemAvatar>
          <Avatar id="iconColor">
            <HotelIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Hotelrooms" secondary={hotel.hotelrooms} />
      </ListItem>
    </List>
    </div>
  )
}

export default ListHotelDetails
