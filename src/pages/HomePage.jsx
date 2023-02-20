import React, { useState, useEffect } from "react"
import ExerciseCard from "../components/ExerciseCard"
import ExerciseDetailsPage from "./ExerciseDetailsPage"
import SideBar from "../components/SideBar"
import { useAuth } from "../context/AuthContext"
import { Box, Grid, Container, Modal } from '@mui/material';
import { getExercisesRequest } from "../utils/apiRequests"

const HomePage = () => {
  const { authTokens, logoutUser } = useAuth()
  
  const [allExercises, setAllExercises] = useState([])
  const [displayedExercises, setDisplayedExercises] = useState([])
  const [modalElement, setModalElement] = useState([])
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    getExercises(authTokens)
  }, [])

  const getExercises = async () => {
    let response = await getExercisesRequest(authTokens)
    let data = await response.json()

    if (response.status === 200) {
      setAllExercises(data)
      setDisplayedExercises(data)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const handleSearch = (searchQuery) => {
    setDisplayedExercises(
      allExercises.filter(
        exercise => exercise.name.toLowerCase().includes(searchQuery)
      )
    )
  }

  const handleFilter = (filterIds) => {
    setDisplayedExercises(
      allExercises.filter(
        exercise => exerciseContainsMuscle(exercise, filterIds)
      )
    )
  }

  const exerciseContainsMuscle = (exercise, filterIds) => {
    const muscles = exercise.primary.concat(exercise.secondary)

    for (const muscle in muscles) {
      if (filterIds.includes(muscles[muscle]['id'] + '')) return true
    }
    return false
  }

  const handleReset = () => {
    setDisplayedExercises(allExercises)
  }

  const handleExerciseModal = (id) => {
    setModalElement(<ExerciseDetailsPage id={id} />)
    setOpen(true)
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

  const cardStyle = {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 5,
      transform: "translateY(-5px)"
    },
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: 1}}>

      <Box sx={{ height: 'calc(100vh - 75px)' }}>

        <Grid container spacing={1} sx={{height: 'inherit'}}>

          <Grid 
            item 
            xs={2}
            sx={{minWidth: '220px'}}
          >
              <SideBar onSearch={handleSearch} onFilter={handleFilter} onReset={handleReset} />
          </Grid>

          <Grid 
            item
            sx={{height: 'inherit', width: 'calc(100vw - 275px)'}}
          >
            <Box sx={{ height: 'inherit', maxHeight: '100%', overflow: 'auto', paddingX: 2, paddingY: 1 }}>
              <Grid container sx={{gap:1, flexGrow:1}}>

                {displayedExercises.map(exercise => 
                <Grid
                  item
                  key={exercise.id} 
                  onClick={() => handleExerciseModal(exercise.id)} 
                  xs={11.5}
                  sm={5.8}
                  md={3.7}
                  lg={2.9}
                  sx={cardStyle}
                >
                  <ExerciseCard exercise={exercise}/>
                </Grid>)}

              </Grid>
            </Box>
          </Grid>

        </Grid>

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

export default HomePage