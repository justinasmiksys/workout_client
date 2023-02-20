import React, { useState, useEffect } from 'react'
import { Card, CardContent, Box, Typography, CardMedia } from '@mui/material';
import { useAuth } from "../context/AuthContext"
import { getExerciseRequest } from '../utils/apiRequests';

const WorkoutDetailsCard = ({id, sets, onClick}) => {
  const { authTokens, logoutUser } = useAuth()
  
  const [exercise, setExercise] = useState(null)

  useEffect(() => {
    getExercise()
  }, [id])

  const getExercise = async () => {
    let response = await getExerciseRequest(authTokens, id)
    let data = await response.json()

    if (response.status === 200) {
      setExercise(data)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const handleClick = () => {
    onClick(id)
  }

  return (
    
    <Card onClick={handleClick} sx={{cursor:'pointer', width: '600px', display:'flex', flexDirection:'column', alignItems:'center', marginBottom:1 }}>

      <CardContent sx={{padding:0}}>

        <Typography variant='h6' sx={{padding:0}}>
          {exercise ? <p>{exercise.name}</p> : <></>}
        </Typography>

      </CardContent>

      <Box sx={{display:'flex', flexDirection:"row", gap:3}}>
        {exercise ? <CardMedia
          sx={{ height: "200px", width:"200px" }}
          image={exercise.url_img}
          title={exercise.name}
        /> : <></>}

        <Box sx={{display:'flex', flexDirection:"column"}}>
            {sets.map((set, index) => <p key={index}>Set {index+1}: {set.reps} reps</p>)}
        </Box>

      </Box>

    </Card>

  )
}

export default WorkoutDetailsCard