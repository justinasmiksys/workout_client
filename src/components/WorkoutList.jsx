import React, { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import { Link } from 'react-router-dom'
import { Container, Button, Box } from '@mui/material';
import { getWorkoutsRequest } from '../utils/apiRequests';


const WorkoutList = ({render}) => {
  const { authTokens, logoutUser } = useAuth()
  
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    async function initializeData() {
      console.log('list init')
      let response = await getWorkoutsRequest(authTokens)
      let data = await response.json()
  
      if (response.status === 200) {
        setWorkouts(data)
        console.log('after set')
  
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    }

    initializeData()
  }, [render])


  return (
    <Container>

      <Box>
        {workouts.map(workout => 
        <Link key={workout.id} to={`${workout.id}`}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor:`${workout.color}` }}
            >
            {workout.title}
          </Button>
        </Link>)
        }
      </Box>
    </Container>
  )
}

export default WorkoutList