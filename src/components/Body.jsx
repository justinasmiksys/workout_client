import React from "react"
import vars from '../utils/vars'
import { Box } from '@mui/material';

const Body = ({primary, secondary}) => {

  return (
    <Box sx={{ position:'relative' }}>
      <img src={vars.url_img_base} alt="" style={{position: "absolute"}}/>
      {primary.map((primary, index)=><img key={index} src={primary.url_main} alt="" style={{position: 'absolute'}}/>)}
      {secondary.map((secondary, index)=><img key={index} src={secondary.url_sec} alt="" style={{position: 'absolute'}}/>)}
    </Box>
  )
}

export default Body