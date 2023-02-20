import React, { useState, useEffect } from 'react'
import { Container, TextField, Button, Box, Grid } from '@mui/material';
import { useAuth } from "../context/AuthContext"
import { HuePicker } from 'react-color';
import ExerciseField from '../components/ExerciseField';
import { useNavigate, useLocation } from 'react-router-dom'
import { getExercisesRequest, postWorkoutRequest, putWorkoutRequest } from '../utils/apiRequests';

const CreateWorkoutPage = () => {
  const { state } = useLocation()

  const { authTokens, logoutUser } = useAuth()
  const [exercises, setExercises] = useState([])
  const [exID, setExID] = useState(2)
  const [exerciseFields, setExerciseFields] = useState([])

  const [hex, setHex] = useState("#fff");
  const [title, setTitle] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    async function initializeData() {
      let response = await getExercisesRequest(authTokens)
      let data = await response.json()
  
      if (response.status === 200) {
        setExercises(data)
        setParams(data)
        setFields(data)
  
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    }
    
    initializeData()
  }, [])

  const setParams = (data) => {
    if (!state) return

    setHex(state.color)
    setTitle(state.title)

    const customFields = []
    let id = 1

    for (const exID in state.exercises) {

      const sets = state.exercises[exID].map(set => {
        return {
          "id": set["priority"],
          "value": set["reps"]
        }
      })

      customFields.push({
        "id":id,
        "value": exID*1,
        "sets": sets,
        "element": <ExerciseField 
                      exercises={data} 
                      id={id} 
                      onChange={handleFieldChange}
                      onAddSet={handleAddSet}
                      onRemoveSet={handleRemoveSet}
                      onSetChange={handleSetChange}
                      initial={exID}
                      initialSets={sets}
                  />
      })

      id++
    }
    setExID(id)
    setExerciseFields(customFields)
  }

  const setFields = (data) => {
    if (!state) {
      const obj = {
        "id": 1,
        "value": 1,
        "sets": [
          {
            "id":1,
            "value":0
          },
        ]
      }
      setExerciseFields(exerciseFields.concat({
        ...obj,
        "element": <ExerciseField 
                    exercises={data} 
                    id={obj.id} 
                    onChange={handleFieldChange} 
                    onAddSet={handleAddSet}
                    onRemoveSet={handleRemoveSet}
                    onSetChange={handleSetChange}
                  />,
      }))
    }
  }

  const postWorkout = async (exercises) => {
    let response = await postWorkoutRequest(authTokens, title, hex, exercises)

    if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const putWorkout = async (exercises) => {
    let response = await putWorkoutRequest(authTokens, state.title, title, hex, exercises)

    if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const handleFieldChange = (id, value) => {
    setExerciseFields(fields => fields.map(field => {
      if (field.id === id) {
        field.value = value
      }
      return field
    }))
  }

  const handleAddSet = (exId, setId) => {
    setExerciseFields(fields=>{
      const field = fields.filter(field=>field.id===exId)[0]
      field.sets = field.sets.concat({"id": setId, "value":0})
      return fields
    })
  }

  const handleRemoveSet = (exId, setId) => {
    setExerciseFields(fields=>{
      const field = fields.filter(field=>field.id===exId)[0]
      field.sets = field.sets.filter(set=>set.id!==setId)
      return fields
    })
  }

  const handleSetChange = (exId, setId, value) => {
    setExerciseFields(fields=>{
      const field = fields.filter(field=>field.id===exId)[0]
      field.sets = field.sets.map(set => {
        if (set.id===setId) {
          set.value=value
        }
        return set
      })
      return fields
    })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    setExerciseFields(exerciseFields.concat({
      "id":exID,
      "value": 1,
      "sets": [
        {
          "id":1,
          "value":0
        },
      ],
      "element": <ExerciseField 
                    exercises={exercises} 
                    id={exID} 
                    onChange={handleFieldChange}
                    onAddSet={handleAddSet}
                    onRemoveSet={handleRemoveSet}
                    onSetChange={handleSetChange}
                />
    }))
    setExID(exID+1)
  }

  const removeMe = (id) => {
    setExerciseFields(exerciseFields.filter(obj => obj.id !== id))
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (state) return handleEdit()
    return handlePost()
  }

  const handleEdit = () => {
    const data = exerciseFields.map(field => ({
      id: field.value,
      sets: field.sets
    }))

    putWorkout(data)
    navigate('/workouts/calendar')
  }

  const handlePost = () => {
    const data = exerciseFields.map(field => ({
      id: field.value,
      sets: field.sets
    }))
    postWorkout(data)
    navigate('/workouts/calendar')
  }

  return (
    <Container maxWidth="md" sx={{display:"flex", flexDirection: 'column', alignItems:'center', height: 'calc(100vh - 75px)', overflow:'scroll', paddingTop:2}}>

      <TextField 
        label="Title"
        onChange={handleTitleChange}
        value={title}
      />

      <Box sx={{height:'20px', marginTop:2}}>
        <HuePicker 
          style={{ marginLeft: 20 }}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
          }}
        />
      </Box>

      <Grid container sx={{gap:1, marginTop:3}}>
        {exercises ? exerciseFields.map((obj)=> <Grid item xs={12} sx={{display:"flex"}} key={obj.id}>

          {obj.element}
          <Box sx={{position:'relative'}}>
            <Button onClick={() => removeMe(obj.id)}>x</Button>
          </Box>
        </Grid>
        ) : <></>}
      </Grid>



      <Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, width:200, marginRight:1 }}
          onClick={handleAdd}
        >
          Add Exercise
        </Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, width:200 }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

    </Container>
  )
}

export default CreateWorkoutPage