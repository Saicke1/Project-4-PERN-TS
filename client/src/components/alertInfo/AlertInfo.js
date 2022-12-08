import React from 'react';
import "./AlertInfo.css";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const AlertInfo = (text) => {
  return (
    <Stack sx={{ width: '80%' }}>
      <Alert severity="error">{text.text}</Alert>
    </Stack>
  )
}

export default AlertInfo
