import React, { useContext, useState } from 'react';
import "./UpdateIcon.css";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { userCommentsContext } from '../../../context/CommentContext';
import { useParams } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RatingStars from '../ratingStars/RatingStars';

const UpdateIcon = ({props}) => {
    const [open, setOpen] = React.useState(false);
    const { comment_id, comment_title, comment_text, rating } = props;
    const [commentTitle, setCommentTitle] = useState(comment_title);
    const [comment, setComment] = useState(comment_text);
    const { updateComment, setStars } = useContext(userCommentsContext);
    const { hotel_id } = useParams();

    const handleClickOpen = () => {
        setStars(rating);
        setOpen(true);
      };
    
      const handleClose = () => {
        setCommentTitle(comment_title);
        setComment(comment_text);
        setStars(0);
        setOpen(false);
      };

    const updating = () => {
        updateComment(comment_id, comment, commentTitle, hotel_id);
        setOpen(false);
    };

  return (
    <div>
        <IconButton aria-label="update" size="large" id='updateButton' onClick={handleClickOpen}>
            <EditIcon/>
        </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit your comment</DialogTitle>
        <RatingStars/>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="comment title"
            fullWidth
            variant="standard"
            value={commentTitle}
            onChange={(e) => setCommentTitle(e.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Text"
            type="comment text"
            fullWidth
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updating}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UpdateIcon
