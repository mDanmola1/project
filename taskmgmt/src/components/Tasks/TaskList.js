import React, { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import { Container, List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const { tasks, deleteTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('There was an error deleting the task!', error);
    }
  };

  const handleUpdate = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2">Task List</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/tasks/new')}>
          Add Task
        </Button>
      </Box>
      <List>
        {tasks.map(task => (
          <ListItem key={task._id} divider>
            <ListItemText primary={task.title} secondary={task.description} />
            <Button variant="contained" color="secondary" onClick={() => handleUpdate(task._id)}>Update</Button>
            <Button variant="contained" color="error" onClick={() => handleDelete(task._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TaskList;
