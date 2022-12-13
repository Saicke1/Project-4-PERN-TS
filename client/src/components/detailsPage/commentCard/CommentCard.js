import React, { useContext } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CommentInput from './commentInput/CommentInput';
import CommentList from './commenlist/CommentList';
import { authContext } from '../../context/AuthContext';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';

const CommentCard = () => {
  const { isLoggedIn } = useContext(authContext);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
      <Box>
        
        <div>
          <Collapse in={checked} collapsedSize={320}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: "10px" }}>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="All Comments"
            />
              <h2>Comments and Ratings</h2>
              <Divider variant="inset" component="li" />
              {isLoggedIn ? <CommentInput/> : <p>To write a comment, please Log In.</p>}
              <Divider variant="inset" component="li" />
              <CommentList/>
            </List>
          </Collapse>
        </div>
    </Box>
      
    </div>
  )
}

export default CommentCard
