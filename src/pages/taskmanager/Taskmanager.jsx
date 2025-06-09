import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskForm from "@components/TaskForm";
import { taskApi } from "../../services/api";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load tasks from API on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
      setError("");
    } catch (err) {
      setError("Failed to load tasks: " + err.message);
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE TASK FUNCTION
  const addTask = async (title, description, priority = "low") => {
    try {
      const newTaskData = {
        title,
        description,
        status: "not-started",
        priority: priority,
      };

      const response = await taskApi.createTask(newTaskData);

      // Add the new task to local state
      setTasks((prevTasks) => [response.task, ...prevTasks]);
      setError("");

      return response.task; // Return the created task
    } catch (err) {
      setError("Failed to create task: " + err.message);
      console.error("Error creating task:", err);
      throw err; // Re-throw so TaskForm can handle it
    }
  };

  // UPDATE TASK FUNCTION
  const updateTask = async (taskId, updatedData) => {
    try {
      const response = await taskApi.updateTask(taskId, updatedData);

      // Update local state
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? response.task : task))
      );
      setError("");

      return response.task;
    } catch (err) {
      setError("Failed to update task: " + err.message);
      console.error("Error updating task:", err);
      throw err;
    }
  };

  // DELETE TASK FUNCTION
  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskApi.deleteTask(taskId);

      // Remove from local state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setError("");
    } catch (err) {
      setError("Failed to delete task: " + err.message);
      console.error("Error deleting task:", err);
    }
  };

  // DRAG AND DROP FUNCTION
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // Drop outside the list
    if (!destination) return;

    // No change in position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find the task being moved
    const taskToMove = tasks.find((task) => task.id.toString() === draggableId);
    if (!taskToMove) return;

    // Optimistically update UI first
    const updatedTask = {
      ...taskToMove,
      status: destination.droppableId,
    };

    const newTasks = tasks.map((task) =>
      task.id.toString() === draggableId ? updatedTask : task
    );

    setTasks(newTasks);

    // Then update backend
    try {
      await updateTask(taskToMove.id, {
        title: taskToMove.title,
        description: taskToMove.description,
        status: destination.droppableId,
        priority: taskToMove.priority,
      });
    } catch (err) {
      // Revert on error
      setTasks(tasks);
    }
  };

  // EDIT TASK FUNCTION (for inline editing)
  const editTask = async (taskId, field, value) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (!taskToEdit) return;

    try {
      await updateTask(taskId, {
        ...taskToEdit,
        [field]: value,
      });
    } catch (err) {
      // Error is already handled in updateTask
    }
  };

  // TOGGLE TASK STATUS FUNCTION
  const toggleTaskStatus = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    // Cycle through statuses: not-started -> in-progress -> completed -> not-started
    let newStatus;
    switch (task.status) {
      case "not-started":
        newStatus = "in-progress";
        break;
      case "in-progress":
        newStatus = "completed";
        break;
      case "completed":
        newStatus = "not-started";
        break;
      default:
        newStatus = "not-started";
    }

    try {
      await updateTask(taskId, {
        ...task,
        status: newStatus,
      });
    } catch (err) {
      // Error is already handled in updateTask
    }
  };

  // CHANGE TASK PRIORITY FUNCTION
  const changeTaskPriority = async (taskId, newPriority) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      await updateTask(taskId, {
        ...task,
        priority: newPriority,
      });
    } catch (err) {
      // Error is already handled in updateTask
    }
  };

  // Get tasks by status from current state
  const getTasksByStatusLocal = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => setIsFormOpen(true)}
          className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <span className="text-xl">+</span> New Task
        </button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={() => setError("")}
              className="float-right text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <TaskForm
        onAddTask={addTask}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {["not-started", "in-progress", "completed"].map((status) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                {status === "not-started"
                  ? "Not Started"
                  : status === "in-progress"
                  ? "In Progress"
                  : "Completed"}
                <span className="text-sm text-gray-500">
                  ({getTasksByStatusLocal(status).length})
                </span>
              </h2>

              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-3 min-h-[200px] ${
                      snapshot.isDraggingOver ? "bg-gray-100" : ""
                    }`}
                  >
                    {getTasksByStatusLocal(status).map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white rounded-lg p-4 shadow-sm ${
                              snapshot.isDragging ? "shadow-md" : ""
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900 flex-1">
                                {task.title}
                              </h3>
                              <div className="flex gap-2 ml-2">
                                {/* Priority Selector */}
                                <select
                                  value={task.priority}
                                  onChange={(e) =>
                                    changeTaskPriority(task.id, e.target.value)
                                  }
                                  className="text-xs border rounded px-1 py-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <option value="high">High</option>
                                  <option value="low">Low</option>
                                  <option value="minimal">Minimal</option>
                                </select>

                                {/* Delete Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(task.id);
                                  }}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                  title="Delete task"
                                >
                                  ×
                                </button>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-2">
                              {task.description}
                            </p>

                            <div className="flex justify-between items-center">
                              <p className="text-gray-500 text-sm">
                                {new Date(task.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>

                              {/* Status Toggle Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTaskStatus(task.id);
                                }}
                                className={`px-2 py-1 text-xs rounded ${
                                  task.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : task.priority === "low"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                } hover:opacity-75`}
                                title="Click to cycle status"
                              >
                                {task.priority}
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskManager;
