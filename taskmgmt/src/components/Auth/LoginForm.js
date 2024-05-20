import React, { useContext } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import AuthContext from '../../context/AuthContext';

function LoginForm() {
  const { login, message } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h2" align="center">Login</Typography>
      </Box>
      {message && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="success">{message}</Alert>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default LoginForm;
