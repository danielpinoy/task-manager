import React, { useState, useEffect } from "react";
function Taskmanager() {
  //   state management
  const [tasks, setTasks] = useState([]);
  cosnt[(filter, setFilter)] = useState("all");

  useEffect(() => {
    const loadInitialTasks = () => {
      const initialTasks = [
        { id: 1, title: "Learn React Basics", completed: true },
        { id: 2, title: "Understand State Management", completed: false },
        { id: 3, title: "Master useEffect", completed: false },
      ];
      setTasks(initialTasks);
    };
    loadInitialTasks();
  }, []);

  // Task Management Functions
  const addTask = (title) => {
    const newTask = {
      id: Date.now(), //generate unique IDs
      title,
      completed: false,
    };
    // Using functional update to ensure we're working with the latest state
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  //   Filter tasks based on current filter state
  const getFilteredTasks = () => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      {/* TaskForm Component - For adding new tasks */}
      {/* TaskFilter Component - For filtering tasks */}
      {/* TaskList Component - Displays filtered tasks */}
      {/* Task Statistics */}
    </div>
  );
}

export default Taskmanager;
