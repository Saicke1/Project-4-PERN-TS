import React, { useContext } from 'react';
import { useParams } from "react-router-dom";
import "./DeleteIcon.css";
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { userCommentsContext } from '../../../context/CommentContext';

const DeleteIcon = (props) => {
    const { comment_id } = props;
    const { hotel_id } = useParams();
    const { deleteComment } = useContext(userCommentsContext);

    const deleting = () => {
        deleteComment(comment_id, hotel_id);
    }

  return (
    <div>
        <IconButton aria-label="delete" size="large" id='deleteButton' onClick={deleting}>
            <DeleteForeverIcon/>
        </IconButton>
    </div>
  )
}

export default DeleteIcon
