// TaskStats.jsx
function TaskStats({ tasks }) {
  const notStartedTasks = tasks.filter(
    (task) => task.status === "not-started"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const StatCard = ({ title, count, icon }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{count}</p>
        </div>
        <span className="material-icons text-gray-400">{icon}</span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard title="Not Started" count={notStartedTasks} icon="note_add" />
      <StatCard
        title="In Progress"
        count={inProgressTasks}
        icon="pending_actions"
      />
      <StatCard title="Completed" count={completedTasks} icon="task_alt" />
    </div>
  );
}

export default TaskStats;
