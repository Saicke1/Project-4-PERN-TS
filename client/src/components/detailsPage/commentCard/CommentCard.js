import React, { useState, useEffect } from 'react';
import "./CommentCard.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CommentInput from './commentInput/CommentInput';
import { useParams } from "react-router-dom";

const CommentCard = () => {
  const { hotel_id } = useParams();
  const [comments, setComments] = useState([]);

  //get all comments
  const getComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/comment/hotelcomments/${hotel_id}`);
      const jsonData = await response.json();
      const sortData = await jsonData.sort(
        (objA, objB) => Number(objA.comment_id) - Number(objB.comment_id)
      );
      setComments(sortData);
      console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

const getDate = comments[0].comment_date

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <h2>Comments and Ratings</h2>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />

      {comments && comments.map(each => {
        return (
          <div>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Username:{each.user_id}
                  </Typography>
                  {" — "}{each.comment_text}{each.comment_date}
                </React.Fragment>
              }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
      );
      })}
      
        <CommentInput/>

    </List>
    </div>
  )
}

export default CommentCard
