// src/pages/priority/Priority.jsx
import { useState, useEffect } from "react";
import { taskApi, getTasksByPriority } from "../../services/api";

function Priority() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [expandedSections, setExpandedSections] = useState({
    high: true,
    low: true,
    minimal: true,
  });

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

  const toggleSection = (priority) => {
    setExpandedSections((prev) => ({
      ...prev,
      [priority]: !prev[priority],
    }));
  };

  const getTasksByPriorityLocal = (priority) => {
    return getTasksByPriority(tasks, priority);
  };

  const StatusIndicator = ({ status }) => {
    return (
      <div className="flex items-center mt-4">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${
            status === "completed"
              ? "bg-green-200"
              : status === "in-progress"
              ? "bg-yellow-200"
              : "bg-red-200"
          }`}
        ></div>
        <span className="text-sm text-gray-600">
          {status === "not-started"
            ? "Not started"
            : status === "in-progress"
            ? "In progress"
            : "Completed"}
        </span>
      </div>
    );
  };

  const PrioritySection = ({ title, priority }) => (
    <div className="mb-8">
      <div
        className="flex items-center mb-5 cursor-pointer bg-gray-200 px-4 py-2 rounded"
        onClick={() => toggleSection(priority)}
      >
        <span className="mr-2 text-gray-700">
          {expandedSections[priority] ? "\u25BC" : "\u25B2"}
        </span>
        <h2 className="text-base font-medium text-gray-800">{title}</h2>
        <span className="ml-2 text-sm text-gray-500">
          ({getTasksByPriorityLocal(priority).length})
        </span>
      </div>

      {expandedSections[priority] && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {getTasksByPriorityLocal(priority).map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col"
            >
              <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">
                {task.description}
              </p>
              <StatusIndicator status={task.status} />
              <p className="text-xs text-gray-400 mt-2">
                {new Date(task.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PrioritySection title="High Priority" priority="high" />
      <PrioritySection title="Low Priority" priority="low" />
      <PrioritySection title="Minimal Priority" priority="minimal" />
    </div>
  );
}

export default Priority;
