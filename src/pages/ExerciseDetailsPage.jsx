import React, { useState, useEffect } from "react"
import { Container, Typography, Grid, Box } from "@mui/material";
import { getExerciseRequest } from "../utils/apiRequests";
import { useAuth } from "../context/AuthContext"
import Description from "../components/Description";
import Body from "../components/Body";

const ExerciseDetailsPage = ({id}) => {
  const { authTokens, logoutUser } = useAuth()
  const [exercise, setExercise] = useState(null)

  useEffect(() => {
    async function getExercise() {
      let response = await getExerciseRequest(authTokens, id)
      let data = await response.json()
  
      if (response.status === 200) {
        setExercise(data)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    }

    getExercise()
  }, [])

  return (
    <Container maxWidth="md">
      {exercise ? <Grid container>

        <Grid item xs={12}>
          <Box sx={{ display:'flex', justifyContent:'center' }}>
            <Typography variant="h4" gutterBottom>
              {exercise.name}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Body 
            primary={exercise.primary} 
            secondary={exercise.secondary}
            equipment={exercise.equipment}
          />
        </Grid>

        <Grid item xs={6}>
            <Description info={exercise.description} />
        </Grid>

      </Grid> : <></>}

    </Container>
  )
}

export default ExerciseDetailsPage