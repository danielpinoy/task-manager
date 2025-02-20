import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskForm from "@components/TaskForm";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const loadInitialTasks = () => {
      const initialTasks = [
        {
          id: "1",
          title: "Organize Digital Files",
          description:
            "Need to pick up groceries for the week, including fresh produce, snacks, and household essentials for daily meals and meal prep.",
          status: "not-started",
          date: "January 28, 2025",
        },
        {
          id: "2",
          title: "Self-Care Routine",
          description:
            "Practice guitar for 30 minutes to improve skills, focusing on new chords and familiarizing myself with a few songs to improve musical dexterity.",
          status: "in-progress",
          date: "January 31, 2025",
        },
        {
          id: "3",
          title: "Deep Cleaning of Apartment",
          description:
            "Reply to friends and family emails, catching up on personal communication, and responding to messages that require attention, like birthday invites and updates.",
          status: "completed",
          date: "January 31, 2025",
        },
      ];
      setTasks(initialTasks);
    };
    loadInitialTasks();
  }, []);

  const addTask = (title, description) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status: "not-started",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Drop outside the list
    if (!destination) return;

    // Find all tasks with the source status
    const sourceItems = tasks.filter(
      (task) => task.status === source.droppableId
    );

    // Find all tasks with the destination status
    // eslint-disable-next-line no-unused-vars
    const destinationItems =
      source.droppableId === destination.droppableId
        ? sourceItems
        : tasks.filter((task) => task.status === destination.droppableId);

    // Find the task being moved
    // eslint-disable-next-line no-unused-vars
    const [movedTask] = sourceItems.splice(source.index, 1);

    // Update the task's status
    const updatedTask = {
      ...tasks.find((task) => task.id === draggableId),
      status: destination.droppableId,
    };

    // Create new array of all tasks
    const newTasks = tasks.filter((task) => task.id !== draggableId);

    // Find where to insert the task in its new status group
    const destinationTasks = newTasks.filter(
      (task) => task.status === destination.droppableId
    );
    destinationTasks.splice(destination.index, 0, updatedTask);

    // Combine all tasks
    const finalTasks = [
      ...newTasks.filter((task) => task.status !== destination.droppableId),
      ...destinationTasks,
    ];

    setTasks(finalTasks);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => setIsFormOpen(true)}
          className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <span className="text-xl">+</span> New Task
        </button>
      </div>

      {/* <Navbar /> */}

      <TaskForm
        onAddTask={addTask}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {["not-started", "in-progress", "completed"].map((status) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                {status === "not-started"
                  ? "Not Started"
                  : status === "in-progress"
                  ? "In Progress"
                  : "Completed"}
              </h2>

              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-3 min-h-[200px] ${
                      snapshot.isDraggingOver ? "bg-gray-100" : ""
                    }`}
                  >
                    {getTasksByStatus(status).map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white rounded-lg p-4 shadow-sm ${
                              snapshot.isDragging ? "shadow-md" : ""
                            }`}
                          >
                            <h3 className="font-medium text-gray-900 mb-2">
                              {task.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {task.description}
                            </p>
                            <p className="text-gray-500 text-sm">{task.date}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskManager;
