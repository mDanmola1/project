import React, { useContext } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import AuthContext from '../../context/AuthContext';

function RegisterForm() {
  const { registerMessage } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    registerMessage();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h2" align="center">Register</Typography>
      </Box>
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
            label="Email"
            type="email"
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
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default RegisterForm;
