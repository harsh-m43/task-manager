import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  filter: 'all',
  currentPage: 1,
  itemsPerPage: 5
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      const newTask = {
        id: uuidv4(),
        title: action.payload.title,
        priority: action.payload.priority,
        completed: action.payload.completed,
        createdAt: new Date().toISOString()
      };
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    case 'UPDATE_TASK':
      const updated = state.tasks.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updated));
      return { ...state, tasks: updated };
    case 'DELETE_TASK':
      const filtered = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(filtered));
      return { ...state, tasks: filtered };
    case 'SET_FILTER':
      return { ...state, filter: action.payload, currentPage: 1 };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(savedTasks) });
    }
  }, []);

  const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task });
  const updateTask = (task) => dispatch({ type: 'UPDATE_TASK', payload: task });
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id });
  const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter });
  const setPage = (page) => dispatch({ type: 'SET_PAGE', payload: page });

  return (
    <TaskContext.Provider value={{
      ...state,
      addTask,
      updateTask,
      deleteTask,
      setFilter,
      setPage
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
