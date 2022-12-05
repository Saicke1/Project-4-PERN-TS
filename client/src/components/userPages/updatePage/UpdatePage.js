import React, { useState, useContext } from 'react';
import "./UpdatePage.css";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdatePage = () => {

  const { user, updateUser } = useContext(authContext);
  const [profiletext, setProfiletext] = useState(user.profiletext);
  const [picture, setPicture] = useState(user.picture);
  const [nickname, setNickname] = useState(user.nickname);

  console.log('user on update page', user);

  function handleSubmit(e){
    e.preventDefault();
  };

  const handleUpdate = () => {
    updateUser(nickname, picture, profiletext);
  };

  return (
    <div className='updateOverwrap'>
      <div className='updateContainer'>
        <Typography variant="h4" gutterBottom style={{ marginTop: "10px" }}>
          Update Profile Content
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>  
          {user &&
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
            multiline
            maxRows={1}
            label="Nickname"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
            />
            {user.picture === null ?
              <TextField
              multiline
              maxRows={1}
              label="Profile Picture"
              onChange={(e) => setPicture(e.target.value)}
              value={picture || ""}
              />
               : <TextField
               multiline
               maxRows={1}
               label="Profile Picture"
               onChange={(e) => setPicture(e.target.value)}
               value={picture}
               />
              }
            <TextField
            multiline
            maxRows={4}
            label="Profile Text"
            onChange={(e) => setProfiletext(e.target.value)}
            value={profiletext || ""}
            />
          </Box>}
          
          
          <Link to="/profile" className="linkStyle">
            <Button variant="contained" style={{ backgroundColor: "#b71e3f", marginBottom: "10px" }} onClick={handleUpdate}>Update</Button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default UpdatePage
