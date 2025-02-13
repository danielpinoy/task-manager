import React from "react";
import { useState } from "react";
function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks to display.</p>
      </div>
    );
  }
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center flex-1 min-w-0">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 transition-colors"
                />
                <div className="ml-4">
                  <h3
                    className={`font-medium truncate ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <button
                      onClick={() =>
                        setExpandedTaskId(
                          expandedTaskId === task.id ? null : task.id
                        )
                      }
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-1 flex items-center"
                    >
                      <span>
                        {expandedTaskId === task.id ? "Hide" : "Show"} Details
                      </span>
                      <svg
                        className={`ml-1 h-4 w-4 transform transition-transform ${
                          expandedTaskId === task.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          {expandedTaskId === task.id && task.description && (
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <p className="text-gray-700 text-sm whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
