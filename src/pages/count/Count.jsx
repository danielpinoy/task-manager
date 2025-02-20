// src/pages/count/Count.jsx
import { useState, useEffect } from "react";

function Count() {
  // State to store task counts by status
  const [taskCounts, setTaskCounts] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    total: 0,
  });

  // Mock data - in a real app, you might fetch this from an API or parent component
  const mockTasks = [
    { id: "1", status: "not-started" },
    { id: "2", status: "in-progress" },
    { id: "3", status: "completed" },
    { id: "4", status: "not-started" },
    { id: "5", status: "completed" },
    { id: "6", status: "not-started" },
    { id: "7", status: "in-progress" },
    { id: "8", status: "completed" },
  ];

  useEffect(() => {
    // Count tasks by status
    const counts = mockTasks.reduce(
      (acc, task) => {
        if (task.status === "completed") acc.completed += 1;
        else if (task.status === "in-progress") acc.inProgress += 1;
        else if (task.status === "not-started") acc.notStarted += 1;
        return acc;
      },
      { completed: 0, inProgress: 0, notStarted: 0 }
    );

    // Set state with counts and total
    setTaskCounts({
      ...counts,
      total: mockTasks.length,
    });
  }, []);

  // Calculate stroke dasharray and dashoffset for each segment
  const calculateSegments = () => {
    const radius = 50; // SVG circle radius
    const circumference = 2 * Math.PI * radius;

    // Calculate percentages
    const total = taskCounts.total || 1; // Prevent division by zero
    const completedPercentage = taskCounts.completed / total;
    const inProgressPercentage = taskCounts.inProgress / total;
    const notStartedPercentage = taskCounts.notStarted / total;

    // Calculate stroke-dasharray and stroke-dashoffset
    const completedLength = circumference * completedPercentage;
    const inProgressLength = circumference * inProgressPercentage;
    const notStartedLength = circumference * notStartedPercentage;

    // Calculate offsets
    const completedOffset = 0;
    const inProgressOffset = completedLength;
    const notStartedOffset = completedLength + inProgressLength;

    return {
      circumference,
      completed: {
        length: completedLength,
        offset: circumference - completedOffset,
      },
      inProgress: {
        length: inProgressLength,
        offset: circumference - inProgressOffset,
      },
      notStarted: {
        length: notStartedLength,
        offset: circumference - notStartedOffset,
      },
    };
  };

  const segments = calculateSegments();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-64 h-64 relative">
        {/* SVG Donut Chart */}
        <svg className="w-full h-full" viewBox="0 0 120 120">
          {/* Completed Segment */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#5A5A5A" // Dark gray
            strokeWidth="12"
            strokeDasharray={`${segments.completed.length} ${
              segments.circumference - segments.completed.length
            }`}
            strokeDashoffset={segments.completed.offset}
            transform="rotate(-90 60 60)"
          />

          {/* In Progress Segment */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#CCCCCC" // Light gray
            strokeWidth="12"
            strokeDasharray={`${segments.inProgress.length} ${
              segments.circumference - segments.inProgress.length
            }`}
            strokeDashoffset={segments.inProgress.offset}
            transform="rotate(-90 60 60)"
          />

          {/* Not Started Segment */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#808080" // Medium gray
            strokeWidth="12"
            strokeDasharray={`${segments.notStarted.length} ${
              segments.circumference - segments.notStarted.length
            }`}
            strokeDashoffset={segments.notStarted.offset}
            transform="rotate(-90 60 60)"
          />
        </svg>

        {/* Total Count at center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold">{taskCounts.total}</span>
          <span className="text-sm text-gray-500">Total</span>
        </div>
      </div>

      {/* Labels */}
      <div className="mt-8 grid grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="text-gray-500">In progress</div>
          <div className="w-2 h-2 mt-1 bg-gray-300 rounded-full"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-gray-500">Not started</div>
          <div className="w-2 h-2 mt-1 bg-gray-500 rounded-full"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-gray-500">Completed</div>
          <div className="w-2 h-2 mt-1 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Count;
