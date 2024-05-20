import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import TaskContext from '../../context/TaskContext';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const navigate = useNavigate();
  const { addTask } = useContext(TaskContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (dayjs(dueDate).isBefore(dayjs())) {
      alert('Due date cannot be before the current date.');
      return;
    }

    try {
      await addTask({
        title,
        description,
        dueDate,
        user: 'userId' // Replace with actual user ID
      });
      navigate('/tasks');
    } catch (error) {
      console.error('There was an error adding the task!', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h2" align="center">Add Task</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              slotProps={{ textField: { fullWidth: true, margin: 'normal', required: true } }}
            />
          </LocalizationProvider>
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

export default TaskForm;
