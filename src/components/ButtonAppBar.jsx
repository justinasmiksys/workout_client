import * as React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext'

export default function ButtonAppBar() {
  const { user, logoutUser } = useAuth()

  return (
    <Box sx={{ flexGrow: 1, height: 70 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Link to="/" style={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              WorkoutApp
            </Typography>
          </Link>

          
          {user ?
          <>
            <Link to="/newworkout">
              <Button color="inherit">new workout</Button>
            </Link>

            <Link to="/workouts/calendar">
              <Button color="inherit">my plan</Button>
            </Link>

            <Button onClick={logoutUser} color="inherit">logout</Button>
          </>
          :
          <>
            <Link to="/login">
              <Button color="inherit">login</Button>
            </Link>
          
            <Link to="/signup">
              <Button color="inherit">signup</Button>
            </Link>
          </>}

        </Toolbar>
      </AppBar>
    </Box>
  );
}