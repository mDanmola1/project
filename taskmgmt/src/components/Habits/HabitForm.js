import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import HabitContext from '../../context/HabitContext';

function HabitForm() {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('');
  const navigate = useNavigate();
  const { addHabit } = useContext(HabitContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addHabit({
        name,
        frequency,
        user: 'userId' // Replace with actual user ID
      });
      navigate('/habits');
    } catch (error) {
      console.error('There was an error adding the habit!', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h2" align="center">Add Habit</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Frequency"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default HabitForm;
