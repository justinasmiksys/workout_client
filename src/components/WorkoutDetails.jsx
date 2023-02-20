import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useOutletContext, useParams } from 'react-router-dom'
import { Typography, Box, Container, Modal, Button } from '@mui/material';
import { useAuth } from "../context/AuthContext"
import ExerciseDetailsPage from "../pages/ExerciseDetailsPage"
import WorkoutDetailsCard from './WorkoutDetailsCard';
import groupBy from '../utils/helpers'
import { deleteWorkoutRequest, getWorkoutRequest } from '../utils/apiRequests';

const WorkoutDetails = () => {
  const { authTokens, logoutUser } = useAuth()
  const params = useParams();

  const [title, setTitle] = useState('')
  const [color, setColor] = useState('')
  const [exercises, setExercises] = useState({})
  const [modalElement, setModalElement] = useState([])
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate()
  const setRender = useOutletContext()

  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function initializeData() {
      let response = await getWorkoutRequest(authTokens, params.id)
      let data = await response.json()
  
      if (response.status === 200) {
        setTitle(data.title)
        setColor(data.color)
        setExercises(groupBy(data.sets,'exercise'))
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    }

    initializeData()
  }, [params])

  const deleteWorkout = async () => {
    let response = deleteWorkoutRequest(authTokens, params.id)
    if (response.statusText === 'Unauthorized') {
      logoutUser()      
    }
  }

  const handleRemove = async () => {
    await deleteWorkout()
    navigate('/workouts/calendar')
    setTimeout( function() {
      setRender(true)
    } ,500)
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const showModal = (id) => {
    setModalElement(<ExerciseDetailsPage id={id} />)
    setOpen(true)
  }

  return (

    <Container>

      <Box
        sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center' }}
      >
        <Typography 
          variant='h4' 
          display='block' 
          gutterBottom
        >
          {title.toUpperCase()}
        </Typography>

        {Object.keys(exercises).map((key, index) => <WorkoutDetailsCard key={index} id={key} sets={exercises[key]} onClick={showModal} />)}

        <Box>
        
          <Link to="/editworkout" state={{ title, color, exercises}}>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, width:'100px', mr:2 }}
            >
              Edit
            </Button>
          </Link>

          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2, width:'100px' }}
            onClick={handleRemove}
          >
            Remove
          </Button>

        </Box>

      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={modalStyle}>
          {modalElement}
        </Box>

      </Modal>

    </Container>

  )
}

export default WorkoutDetails