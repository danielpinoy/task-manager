// src/services/taskApi.js
const API_BASE_URL = "http://localhost:5000/api";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }
  return response.json();
};

// Task API functions
export const taskApi = {
  // Get all tasks for the authenticated user
  getAllTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      credentials: "include", // Include HTTP-only cookies
    });
    return handleResponse(response);
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  // Update a task
  updateTask: async (taskId, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  // Delete a task
  deleteTask: async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      credentials: "include",
    });
    return handleResponse(response);
  },

  // Get tasks by status
  getTasksByStatus: async (status) => {
    const response = await fetch(`${API_BASE_URL}/tasks/status/${status}`, {
      credentials: "include",
    });
    return handleResponse(response);
  },

  // Get tasks by priority
  getTasksByPriority: async (priority) => {
    const response = await fetch(`${API_BASE_URL}/tasks/priority/${priority}`, {
      credentials: "include",
    });
    return handleResponse(response);
  },
};

// Helper functions for task statistics
export const getTaskStatusCounts = (tasks) => {
  return {
    completed: tasks.filter((task) => task.status === "completed").length,
    inProgress: tasks.filter((task) => task.status === "in-progress").length,
    notStarted: tasks.filter((task) => task.status === "not-started").length,
    total: tasks.length,
  };
};

export const getTasksByStatus = (tasks, status) => {
  return tasks.filter((task) => task.status === status);
};

export const getTasksByPriority = (tasks, priority) => {
  return tasks.filter((task) => task.priority === priority);
};
