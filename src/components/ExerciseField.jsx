import React, { useState, useEffect } from 'react'
import { TextField, Button, MenuItem, Card, CardActions, CardContent, Grid, Box } from '@mui/material';

const SetField = ({id, onChange, initial}) => {
  const handleChange = event => {
    onChange(id, event.target.value)
  }

  return <input 
            type="number" 
            onChange={handleChange}
            placeholder="reps"
            defaultValue={initial ?? 0}
          />
}

/////////////////////////////////////////////////////////////////////////////

const ExerciseField = ({exercises, id, onChange, onAddSet, onRemoveSet, onSetChange, initial, initialSets}) => {
  const [setFields, setSetFields] = useState([])
  const [setID, setSetID] = useState(2)

  useEffect(() => {
    function initializeData() {
      if (initialSets) {
        initializeEdit()
      } else {
        initializeCreate()
      }
    }

    initializeData()
  }, [])

  const initializeEdit = () => {
    const sets = initialSets.map(set => {
      setSetID(set["id"] > setID ? set["id"] : setID)
      return {
        "id": set["id"],
        "value": set["value"],
        "element": <SetField id={set["id"]} onChange={handleSetChange} initial={set["value"]} />
      }
    })

    setSetFields(sets)
    setSetID(setID => setID+1)
  }

  const initializeCreate = () => {
    const obj = {
      "id": 1,
      "value": 0,
    }

    setSetFields(setFields.concat({
      ...obj,
      "element": <SetField id={obj.id} onChange={handleSetChange} />,
    }))
  }

  const handleSetChange = (setId, value) => {
    setSetFields(fields => fields.map(field => {
      if (field.id === setId) {
        field.value = value
      }
      return field
    }))

    onSetChange(id, setId, value)
  }

  const handleChange = event => {
    onChange(id, event.target.value);
  };

  const handleAddSet = (id) => {
    setSetFields(setFields.concat({
      "id":setID,
      "value": 0,
      "element": <SetField id={setID} onChange={handleSetChange} />
    }))

    onAddSet(id, setID)
    setSetID(setID+1)
  }

  const handleRemoveSet = (id, setId) => {
    onRemoveSet(id, setId)
    setSetFields(setFields.filter(obj => obj.id !== setId))
  }

  return (
    <Card sx={{ width: '100%' }}>

      <CardContent>

        <TextField
          id="select-exercise"
          select
          label="Exercise"
          defaultValue={initial ?? "1"}
          onChange={handleChange}
          sx={{width:'100%', marginBottom:1}}
        >
          {exercises.map((exercise) => (
            <MenuItem key={exercise.id} value={exercise.id}>
              {exercise.name}
            </MenuItem>
          ))}
        </TextField>

        <Grid container>
          {setFields.map(obj => 
          <Grid item xs={3} sx={{display:'flex', flexDirection:'row', marginBottom:1}} key={obj.id}>
            <Box sx={{display: 'flex', width:'10px'}}>
              {obj.element}
              <Box sx={{position:'relative', transform:'translate(-50px, 0px)'}}>
                <Button onClick={() => handleRemoveSet(id, obj.id)}>x</Button>
              </Box>
            </Box>
          </Grid>)}
        </Grid>

      </CardContent>


      <CardActions>
        <Button onClick={() => handleAddSet(id)}>add set</Button>
      </CardActions>

    </Card>

  )
}

export default ExerciseField