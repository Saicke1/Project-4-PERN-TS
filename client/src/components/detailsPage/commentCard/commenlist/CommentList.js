import React, { useEffect, useContext } from 'react';
import "./CommentList.css";
import { useParams } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { authContext } from '../../../context/AuthContext';
import { userCommentsContext } from '../../../context/CommentContext';
import DeleteIcon from '../deleteIcon/DeleteIcon';
import UpdateIcon from '../updateIcon/UpdateIcon';

const CommentList = () => {
    const { hotel_id } = useParams();
    const { user } = useContext(authContext);
    const { comments, getAllComments } = useContext(userCommentsContext);

    //new fetch for new comments
    /* const getToken = localStorage.getItem("token"); */

  /* const getAllComments = async () => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
            "Authorization": `Bearer ${getToken}`}
        };

        const response = await fetch(`http://localhost:5000/comments/all/${hotel_id}`, requestOptions);
        const jsonData = await response.json();
        console.log('fetched data from the new comments route >>>', jsonData);
        setComments(jsonData);
    } catch (error) {
        console.log('error.message', error.message);
        console.log("Wasn't able to fetch the comments due to Server Error.")
    }
  }; */

  //get all comments
  /* const getComments = async () => {
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
  }; */

  useEffect(() => {
    getAllComments(hotel_id);
  }, []);

  return (
    <div>
      {comments && comments.map((each, index) => {
        return (
          <div id={each.comment_id} className="eachCommentBox">
            <ListItem alignItems="flex-start" id={each.comment_id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
              primary={each.comment_title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {each.nickname}:
                  </Typography>
                  {" — "}{each.comment_text} <br></br> {each.comment_date}
                </React.Fragment>
              }
              />
            </ListItem>
            {user && each.user_id === user.user_id ? <DeleteIcon comment_id={each.comment_id} /> : <></>}
            {user && each.user_id === user.user_id ? <UpdateIcon props={each}/> : <></>}
            <Divider variant="inset" component="li" />
          </div>
      );
      })}
    </div>
  )
}

export default CommentList
