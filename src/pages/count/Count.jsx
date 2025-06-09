// src/pages/count/Count.jsx
import { useState, useEffect } from "react";
import CompactCount from "../../components/navbar/CompactCount";
import { taskApi, getTaskStatusCounts } from "../../services/api";

function Count() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get task counts from the loaded tasks
  const [taskCounts, setTaskCounts] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    total: 0,
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);

      // Calculate counts from fetched tasks
      const counts = getTaskStatusCounts(fetchedTasks);
      setTaskCounts(counts);
      setError("");
    } catch (err) {
      setError("Failed to load tasks: " + err.message);
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={loadTasks}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Large Count Chart */}
      <div className="mb-8">
        <CompactCount size={320} showLabels={true} taskCounts={taskCounts} />
      </div>

      {/* Task Statistics */}
      <div className="mt-12 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Task Statistics</h2>
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Total Tasks</p>
              <p className="text-2xl font-bold">{taskCounts.total}</p>
            </div>
            <div>
              <p className="text-gray-500">Completed</p>
              <p className="text-2xl font-bold">{taskCounts.completed}</p>
            </div>
            <div>
              <p className="text-gray-500">In Progress</p>
              <p className="text-2xl font-bold">{taskCounts.inProgress}</p>
            </div>
            <div>
              <p className="text-gray-500">Not Started</p>
              <p className="text-2xl font-bold">{taskCounts.notStarted}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Count;
