function TaskStats({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="task-stats grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded">
      <div className="text-center">
        <p className="text-lg font-semibold">{totalTasks}</p>
        <p className="text-gray-600">Total Tasks</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold">{completedTasks}</p>
        <p className="text-gray-600">Completed</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold">{activeTasks}</p>
        <p className="text-gray-600">Active</p>
      </div>
    </div>
  );
}

export default TaskStats;
