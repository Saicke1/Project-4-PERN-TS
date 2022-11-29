import React, { useContext, useState } from 'react';
import "./CommentInput.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RatingStars from '../ratingStars/RatingStars';
import { userCommentsContext } from '../../../context/CommentContext';
import { useParams } from "react-router-dom";

const CommentInput = () => {
    const [open, setOpen] = React.useState(false);
    const [commentTitle, setCommentTitle] = useState("");
    const [comment, setComment] = useState("");
    const { createComment, setStars } = useContext(userCommentsContext);
    const { hotel_id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setStars(0);
    setOpen(false);
  };

  const handleSend = () => {
    createComment(comment, commentTitle, hotel_id);
    setOpen(false);
  };

  return (
    <div className='commentInput'>
      <Button variant="outlined" onClick={handleClickOpen}>
        Rate and Comment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rating</DialogTitle>
        <RatingStars/>
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please set a title:
          </DialogContentText>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
            <TextField
              id="outlined-textarea"
              label="max. 25 characters"
              placeholder="Comment title"
              multiline
              onChange={(e) => setCommentTitle(e.target.value)}
              />
              <DialogContentText>
            Please be respectful and friendly:
          </DialogContentText>
              <TextField
              id="outlined-textarea"
              label="max. 300 characters"
              placeholder="Your comment"
              multiline
              onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CommentInput
