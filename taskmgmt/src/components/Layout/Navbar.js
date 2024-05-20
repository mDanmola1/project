import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Productivity App
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/tasks">Task List</Button>
            <Button color="inherit" component={Link} to="/tasks/new">Add Task</Button>
            <Button color="inherit" component={Link} to="/habits">Habit List</Button>
            <Button color="inherit" component={Link} to="/habits/new">Add Habit</Button>
            <Button color="inherit" onClick={logout}>Sign Out</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
