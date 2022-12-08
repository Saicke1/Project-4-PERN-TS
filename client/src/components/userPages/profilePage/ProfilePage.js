import React, { useContext } from "react";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import dummyPic from "../../../images/dummyImage.jpeg";
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const ProfilePage = () => {
  const { user, isLoggedIn } = useContext(authContext);
  
  return (
    <div className='profileOverwrap'>
      <div className="profileContainer">
        <Link to="/update">
          <IconButton aria-label="update" id="iconButtonposition">
            <EditIcon fontSize="inherit" id='profilePicUpdateButton'/>
          </IconButton>
        </Link>
        <Typography variant="h4" gutterBottom style={{ marginTop: "10px" }}>
        Welcome Back
        </Typography>
        {user &&
        <div className="profileDisplay">
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab variant="extended" id="nicknameBadge">
              {user.nickname}
            </Fab>
          </Box>
          {user.picture ?
            <div className="imageContainer">
              <img alt="profilepic" src={user.picture} className="profilePic"/>
            </div> :
            <div className="imageContainer">
              <img alt="dummypic" src={dummyPic} className="profilePic"/>
            </div>
          }
          <div className="profileText">
            <p>{user.profiletext}</p>
          </div>
        </div>}
            
      </div>
    </div>);
};

export default ProfilePage;
