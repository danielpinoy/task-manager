// src/pages/count/Count.jsx
import { useState, useEffect } from "react";
import CompactCount from "../../components/navbar/CompactCount";
import { getTaskStatusCounts } from "../../services/api";
function Count() {
  // Get task counts from the API
  const [taskCounts, setTaskCounts] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    total: 0,
  });

  useEffect(() => {
    // Use the helper function to get status counts
    const counts = getTaskStatusCounts();
    setTaskCounts(counts);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Large Count Chart */}
      <div className="mb-8">
        <CompactCount size={320} showLabels={true} />
      </div>

      {/* Legend */}
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
