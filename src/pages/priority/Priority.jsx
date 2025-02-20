// src/pages/priority/Priority.jsx
import { useState, useEffect } from "react";
import { sampleTasks } from "../../services/api";

function Priority() {
  const [tasks, setTasks] = useState([]);

  const [expandedSections, setExpandedSections] = useState({
    high: true,
    low: true,
    minimal: true,
  });

  useEffect(() => {
    // Load tasks from the Api instead of local initialTasks
    setTasks(sampleTasks);
  }, []);

  const toggleSection = (priority) => {
    setExpandedSections((prev) => ({
      ...prev,
      [priority]: !prev[priority],
    }));
  };

  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority);
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
      </div>

      {expandedSections[priority] && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {getTasksByPriority(priority).map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col"
            >
              <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">
                {task.description}
              </p>
              <StatusIndicator status={task.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PrioritySection title="High Priority" priority="high" />
      <PrioritySection title="Low Priority" priority="low" />
      <PrioritySection title="Minimal Priority" priority="minimal" />
    </div>
  );
}

export default Priority;
