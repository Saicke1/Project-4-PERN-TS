import React, { useContext, useEffect } from 'react';
import "./CommentPage.css";
import MyTypography from "@material-ui/core/Typography";
import { userCommentsContext } from '../../context/CommentContext';
import { showDate } from '../../../utils/dateConvert/DateConvert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import DeleteIcon from '../../detailsPage/commentCard/deleteIcon/DeleteIcon';
import UpdateIcon from '../../detailsPage/commentCard/updateIcon/UpdateIcon';
import StarsReadOnly from '../../detailsPage/commentCard/ratingStars/StarsReadOnly';
import Button from '@mui/material/Button';

const CommentPage = () => {
  const { commentFromOneUser, myComments } = useContext(userCommentsContext);

  useEffect(() => {
    commentFromOneUser();
  }, []);

  console.log('myComments', myComments);

  return (
    <div className='commentContainer'>
      <MyTypography variant="h4" gutterBottom style={{ marginTop: "10px" }}>
        My Comments
      </MyTypography>

      <div className='CommentList'>
        {myComments && myComments.map((each, index) => {
        return (
              <div className='eachCommentCard' key={each.comment_id}>
                <Card sx={{ maxWidth: 345 }}>
                    <div className='datePosition'>{showDate(each.comment_date).toString() || ""}</div>
                    <CardContent style={{ marginTop: "10px"}}>
                        <Typography gutterBottom variant="h5" component={'span'}>
                        {each.comment_title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component={'span'}>
                        Your Rating: <StarsReadOnly rating={each.rating}/>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component={'span'}>
                        {each.comment_text}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={`/details/${each.hotel_id}`} className="linkStyle">
                        <Button variant="contained" style={{ backgroundColor: "#1EB796" }}>Related Hotel</Button>
                        </Link>
                    </CardActions>
                    <DeleteIcon comment_id={each.comment_id}/>
                    <UpdateIcon props={each}/>
                </Card>
              </div>
            )})}
        </div>

    </div>
  )
}

export default CommentPage
