import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get('/api/habits');
        setHabits(response.data);
      } catch (error) {
        console.error('There was an error fetching the habits!', error);
      }
    };

    fetchHabits();
  }, []);

  const addHabit = async (habit) => {
    try {
      const response = await axios.post('/api/habits', habit);
      setHabits((prevHabits) => [...prevHabits, response.data]);
    } catch (error) {
      console.error('There was an error adding the habit!', error);
    }
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit }}>
      {children}
    </HabitContext.Provider>
  );
};

export default HabitContext;
