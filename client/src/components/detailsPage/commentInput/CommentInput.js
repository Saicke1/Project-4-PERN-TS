import React from 'react';
import "./CommentInput.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RatingStars from '../ratingStars/RatingStars';

const CommentInput = () => {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
            Please be respectful and friendly:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="max. 300 characters"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CommentInput
