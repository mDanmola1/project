import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { HabitProvider } from './context/HabitContext';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <TaskProvider>
            <HabitProvider>
              <App />
            </HabitProvider>
          </TaskProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
