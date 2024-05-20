import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import HabitList from './components/Habits/HabitList';
import HabitForm from './components/Habits/HabitForm';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import AuthContext from './context/AuthContext';
import './App.css';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      <div className="App-content">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/habits" element={<HabitList />} />
          <Route path="/habits/new" element={<HabitForm />} />
          <Route path="/" element={isAuthenticated ? <TaskList /> : <Welcome />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function Welcome() {
  return (
    <div>
      <h1>Welcome to Task Manager</h1>
      <p>Please sign in to view and manage your tasks.</p>
    </div>
  );
}

export default App;
