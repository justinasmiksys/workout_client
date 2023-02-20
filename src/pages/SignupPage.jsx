import * as React from 'react';
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validator from 'validator';

const theme = createTheme();

export default function Login() {
  const { signup } = useAuth()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (
        !e.target.username.value ||
        !e.target.email.value ||
        !e.target.password.value ||
        !e.target.repeatPassword.value 
    ) {
        setError('Please fill in all required fields')
        return
    }

    if (!validator.isEmail(e.target.email.value)) {
        setError('Please provide correct email address')
        return
    }

    if (e.target.password.value !== e.target.repeatPassword.value) {
      setError('Passwords do not match.')
      return
    }

    const response = await signup(
      e.target.username.value,
      e.target.email.value, 
      e.target.password.value
    )

    const data = await response.json()

    if (response.status === 200) {
      setError('Account was created, you can login.')
      e.target.username.value = ''
      e.target.email.value = ''
      e.target.password.value = ''
      e.target.repeatPassword.value = ''
    } else {
      setError(data.error)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signup
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="repeatPassword"
              label="Repeat Password"
              type="password"
              id="repeatPassword"
              autoComplete="current-password"
            />

            <p>{error}</p>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Signup
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}