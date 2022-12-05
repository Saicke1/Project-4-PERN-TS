import React, { useContext } from 'react';
import "./CommentCard.css";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CommentInput from './commentInput/CommentInput';
import CommentList from './commenlist/CommentList';
import { authContext } from '../../context/AuthContext';

const CommentCard = () => {
  const { isLoggedIn } = useContext(authContext);
  console.log('isLoggedIn on CommentCard.js', isLoggedIn);

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <h2>Comments and Ratings</h2>
        <Divider variant="inset" component="li" />
        <CommentList/>
        {isLoggedIn ? <CommentInput/> : <p>To write a comment, please Log In.</p>}
    </List>
    </div>
  )
}

export default CommentCard
