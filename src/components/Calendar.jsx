import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { Box, Modal, Typography, Button } from '@mui/material';
import { useAuth } from "../context/AuthContext"
import { deleteEvent, getEventsRequest, getWorkoutsRequest, postEventRequest } from '../utils/apiRequests';

const Calendar = () => {
  const { authTokens, logoutUser } = useAuth()
  
  const [open, setOpen] = useState(false);
  const [eventDate, setEventDate] = useState('')
  const [workouts, setWorkouts] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    async function initializeData() {
      await getWorkouts()
      await getEvents()
    }

    initializeData()
  }, [])

  const getEvents = async () => {
    let response = await getEventsRequest(authTokens)
    let data = await response.json()

    if (response.status === 200) {
      const formattedEvents = data.map(event => {
        const obj = {
          id: event.id,
          title: event.title.toUpperCase(),
          backgroundColor: event.color,
          date: event.date.split('T')[0]
        }
        return obj
      })
      setEvents(formattedEvents)

    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const getWorkouts = async () => {
    let response = await getWorkoutsRequest(authTokens)
    let data = await response.json()

    if (response.status === 200) {
      setWorkouts(data)

    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const postEvent = async (eventDate, workoutId) => {
    let response = await postEventRequest(authTokens, eventDate, workoutId)

    if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const removeEvent = async (eventId) => {
    let response = await deleteEvent(authTokens, eventId)

    if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const handleClose = () => setOpen(false);

  const handleDateClick = (arg) => {
    setEventDate(arg.dateStr)
    setOpen(true)
  }

  const handleAddEvent = async (id) => {
    await postEvent(eventDate, id)
    await getEvents()
    setOpen(false)
  }

  const handleRemoveEvent = async (e) => {
    await removeEvent(e.event._def.publicId)
    await getEvents()
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{height:'inherit'}}>
      <FullCalendar 
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        eventClick={handleRemoveEvent}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select the workout
          </Typography>
          <Box sx={{display:'flex', flexDirection:'column'}}>
            
            {workouts.map(workout => <Button variant="contained" sx={{ mt: 2, backgroundColor:`${workout.color}` }}  onClick={() => handleAddEvent(workout.id)}>{workout.title}</Button>)}

          </Box>
        </Box>
      </Modal>

    </Box>
  )
}

export default Calendar