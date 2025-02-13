import React, { useState, useEffect } from "react";
import TaskForm from "@components/TaskForm";
import TaskList from "@components/TaskList";
import TaskFilter from "@components/TaskFilter";
import TaskStats from "@components/TaskStats";
function Taskmanager() {
  //   state management
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadInitialTasks = () => {
      const initialTasks = [
        {
          id: 1,
          title: "Learn React Basics",
          description: "Study components, props, and state management",
          completed: true,
        },
        {
          id: 2,
          title: "Understand State Management",
          description: "Deep dive into useState and useEffect hooks",
          completed: false,
        },
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
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      {/* TaskForm Component - For adding new tasks */}
      <TaskForm onAddTask={addTask} />

      {/* TaskFilter Component - For filtering tasks */}
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

      {/* TaskList Component - Displays filtered tasks */}
      <TaskList
        tasks={getFilteredTasks()}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />

      {/* Task Statistics */}
      <TaskStats tasks={tasks} />
    </div>
  );
}

export default Taskmanager;
