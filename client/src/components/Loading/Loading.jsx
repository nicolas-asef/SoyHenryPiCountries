import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import style from "./Loading.module.css"

export default function Loading() {
  return (
    <Box sx={{ display: 'flex' }} className={style.load}>
      <CircularProgress  size={150}/>
    </Box>
  );
}