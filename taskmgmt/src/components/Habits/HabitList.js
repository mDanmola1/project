import React, { useContext } from 'react';
import HabitContext from '../../context/HabitContext';
import { Container, List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HabitList() {
  const { habits, deleteHabit } = useContext(HabitContext);
  const navigate = useNavigate();

  const handleDelete = async (habitId) => {
    try {
      await deleteHabit(habitId);
    } catch (error) {
      console.error('There was an error deleting the habit!', error);
    }
  };

  const handleUpdate = (habitId) => {
    navigate(`/habits/edit/${habitId}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2">Habit List</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/habits/new')}>
          Add Habit
        </Button>
      </Box>
      <List>
        {habits.map(habit => (
          <ListItem key={habit._id} divider>
            <ListItemText primary={habit.name} secondary={`Frequency: ${habit.frequency}`} />
            <Button variant="contained" color="secondary" onClick={() => handleUpdate(habit._id)}>Update</Button>
            <Button variant="contained" color="error" onClick={() => handleDelete(habit._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default HabitList;
