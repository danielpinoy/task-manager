function TaskFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="task-filter flex space-x-2 mb-6">
      <button
        className={`px-4 py-2 rounded ${
          currentFilter === "all"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={`px-4 py-2 rounded ${
          currentFilter === "active"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => onFilterChange("active")}
      >
        Active
      </button>
      <button
        className={`px-4 py-2 rounded ${
          currentFilter === "completed"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default TaskFilter;
