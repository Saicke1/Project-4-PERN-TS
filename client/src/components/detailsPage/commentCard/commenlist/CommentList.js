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
import StarsReadOnly from '../ratingStars/StarsReadOnly';
import {showDate} from "../../../../utils/dateConvert/DateConvert.js";

const CommentList = () => {
    const { hotel_id } = useParams();
    const { user } = useContext(authContext);
    const { comments, getAllComments } = useContext(userCommentsContext);

  useEffect(() => {
    getAllComments(hotel_id);
  }, []);

  return (
    <div>
      {comments && comments.map(each => {
        return (
          <div key={each.comment_id} className="eachCommentBox">
            <ListItem id="listItemStyle">
              <ListItemAvatar>
                {each.picture ? <Avatar alt="profile picture" src={each.picture} />
                : <Avatar alt="profile picture" src="/static/images/avatar/1.jpg" />}
              </ListItemAvatar>
              <div className='commentTextStyle'>
              <ListItemText primary={each.comment_title} />
              <StarsReadOnly rating={each.rating}/>
              <ListItemText
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
                   {" — "}{each.comment_text} <br></br> 
                   {showDate(each.comment_date).toString() || ""}
                  </React.Fragment>
                }
              />
              </div>
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
