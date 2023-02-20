import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, TextField, FormControl, FormGroup, FormControlLabel, Checkbox, IconButton, Typography } from '@mui/material';
import { getMusclesRequest } from "../utils/apiRequests";

const SideBar = ({onSearch, onFilter, onReset}) => {
  const { authTokens, logoutUser } = useAuth()
  
  const [muscles, setMuscles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [boxes, setBoxes] = useState({})

  useEffect(() => {
    async function initializeData() {
      let response = await getMusclesRequest(authTokens)
      let data = await response.json()
  
      if (response.status === 200) {
        setMuscles(data)
        setBoxes(data.reduce((obj, muscle) => {
          obj[muscle.id] = false
          return obj
        }, {}))
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    }

    initializeData()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const toggleBox = (e) => {
    const id = e.target.value
    const value = boxes[id]
    setBoxes({...boxes, [id]:!value})
  }

  const handleFilter = (e) => {
    e.preventDefault()
    const selectedBoxes = Object.keys(boxes).filter(key=>boxes[key])
    onFilter(selectedBoxes)
  }

  const handleReset = (e) => {
    e.preventDefault()
    setSearchQuery('')
    setBoxes(muscles.reduce((obj, muscle) => {
      obj[muscle.id] = false
      return obj
    }, {}))
    onReset()
  }

  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>

      <FormControl sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <TextField
          id="search-bar"
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
          label="Search exercises..."
          variant="outlined"
          size="small"
          sx={{ width: 'inherit' }}
          value={searchQuery}
        />
        
        <IconButton 
          type="button" 
          sx={{ p: '10px', position:'absolute', transform: 'translateX(185px)' }} 
          aria-label="search" 
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>

      </FormControl>


      <FormControl component="fieldset">
        <FormGroup aria-label="position">

          <Grid container>

            {muscles.map(muscle=> 
              <Grid 
                item 
                xs={12}
                key={muscle.id}
              >
                <FormControlLabel
                  value={muscle.id}
                  control={<Checkbox sx={{marginLeft:'auto'}} size="small" checked={boxes[muscle.id]} onChange={toggleBox} />}
                  label={<Typography variant="subtitle2">{muscle.name}</Typography>}
                  labelPlacement="start"
                  sx={{width:'100%'}}
                />
              </Grid>
              )}

          </Grid>

        </FormGroup>
      </FormControl>


      <Box sx={{display: 'flex', width:'inherit'}}>
        <Button sx={{marginRight: '10px'}} variant="outlined" onClick={handleReset}>Reset</Button>
        <Button variant="outlined" onClick={handleFilter}>Filter</Button>
      </Box>

    </Box>
  )
}

export default SideBar