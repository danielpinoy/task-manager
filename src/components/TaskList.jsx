import { Droppable, Draggable } from "@hello-pangea/dnd";

function TaskList({ status, tasks, onDeleteTask }) {
  const getColumnStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "rgb(243 244 246)" : "rgb(249 250 251)",
    padding: "1rem",
    minHeight: "500px",
    borderRadius: "0.5rem",
  });

  return (
    <div className="bg-gray-50 rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold capitalize">
          {status === "todo"
            ? "To Do"
            : status === "in-progress"
            ? "In Progress"
            : "Done"}
        </h2>
        <div className="mt-1 text-sm text-gray-500">{tasks.length} tasks</div>
      </div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getColumnStyle(snapshot.isDraggingOver)}
            className="h-full"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-200 hover:shadow-md transition-shadow ${
                      snapshot.isDragging ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">
                        {task.title}
                      </h3>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    {task.description && (
                      <p className="mt-2 text-sm text-gray-500">
                        {task.description}
                      </p>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskList;
