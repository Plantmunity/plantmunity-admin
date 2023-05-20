import React from 'react'
import { Stack, TextField, Typography, Button } from '@mui/material'

const LoginForm = () => {
  return (
    <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
      <Typography
        variant="h4"
        align='center'
        sx={{
          mb: 8,
          mt: 10,
          color: "#7C9B6C",
          fontWeight: 'medium',
          fontFamily: 'future',
        }}>
        Welcome to Plantmunity
      </Typography>

      <TextField
        required
        id="username"
        label="Username"
        variant="outlined"
        sx={{
          width: '70%',
          mb: 2
        }}
      />

      <TextField
        required
        id="password"
        label="Password"
        variant="outlined"
        sx={{
          width: '70%',
          mb: 3
        }}
      />

      <Button
        type={'text'}
        variant="contained"
        sx={{
          width: '70%',
          mb: 2,
          mt: 2,
          color: "white",
          textTransform: "none"
        }}
      > Log In
      </Button>

    </Stack>
  )
}

export default LoginForm