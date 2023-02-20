import * as React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function ExerciseCard({exercise}) {

  const cardStyle = { 
    width: '100%', 
    height: 250, 
    display:'flex', 
    flexDirection:'column',
    justifyContent: 'space-between',
    padding: 1
  }

  return (
    <Card sx={cardStyle}>

      <CardContent>
        <Typography sx={{ width: '100%' }} gutterBottom variant="h6" component="p" align='center'>
          {exercise.name}
        </Typography>
      </CardContent>

      <CardMedia
        sx={{ height: "inherit" }}
        image={exercise.url_img}
        title={exercise.name}
      />
    </Card>
  );
}