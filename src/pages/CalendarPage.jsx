import React, { useState, useEffect } from 'react'
import { Container, Box, Grid } from '@mui/material'
import WorkoutList from '../components/WorkoutList'
import { Outlet } from 'react-router-dom'

const CalendarPage = () => {
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (render) {
      setRender(false)
    }
  }, [render])
  
  return (
    <Container maxWidth="xl">

      <Box sx={{height: 'calc(100vh - 75px)'}}>

        <Grid container gap={5} sx={{height:'inherit'}}>

          <Grid item xs={2} >
            <WorkoutList render={render} />
          </Grid>

          <Grid item xs={9} sx={{height:'inherit', overflow:'scroll'}}>
            <Container>
              <Outlet context={setRender} />
            </Container>
          </Grid>

        </Grid>

      </Box>

    </Container>
  )
}

export default CalendarPage