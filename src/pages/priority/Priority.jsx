// src/pages/priority/Priority.jsx
import { useState } from "react";

function Priority() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Organize Digital Files",
      description:
        "Need to pick up groceries for the week, including fresh produce, snacks, and household essentials for daily meals and meal prep.",
      status: "not-started",
      date: "January 31, 2025",
      priority: "low",
    },
    {
      id: "2",
      title: "Self-Care Routine",
      description:
        "Practice guitar for 30 minutes to improve skills, focusing on new chords and familiarizing myself with a few songs to improve musical dexterity.",
      status: "in-progress",
      date: "January 31, 2025",
      priority: "minimal",
    },
    {
      id: "3",
      title: "Deep Cleaning of Apartment",
      description:
        "Reply to friends and family emails, catching up on personal communication, and responding to messages that require attention, like birthday invites and updates.",
      status: "completed",
      date: "January 31, 2025",
      priority: "high",
    },
    {
      id: "4",
      title: "Plan Weekly Schedule",
      description:
        "Plan out tasks and goals for the upcoming week, ensuring all work, personal projects, and leisure activities are scheduled to balance productivity and rest.",
      status: "not-started",
      date: "January 31, 2025",
      priority: "high",
    },
    {
      id: "5",
      title: "Respond to Personal Emails",
      description:
        "Take a bath, meditate, and relax after a busy day to decompress and recharge, ensuring mental and physical well-being is prioritized.",
      status: "completed",
      date: "January 31, 2025",
      priority: "low",
    },
    {
      id: "6",
      title: "Morning Workout Routine",
      description:
        "Organizing and cleaning the apartment for a fresh start, which includes decluttering, dusting, vacuuming, and ensuring all areas are tidy for a cleaner living environment.",
      status: "not-started",
      date: "January 31, 2025",
      priority: "low",
    },
    {
      id: "7",
      title: "Practice Guitar",
      description:
        "Sort out files on the laptop, organize important documents, delete unneeded files, and back up essential data for easy access and storage security.",
      status: "in-progress",
      date: "January 31, 2025",
      priority: "minimal",
    },
    {
      id: "8",
      title: "Grocery Shopping",
      description:
        "A quick 30-minute workout to start the day with energy, focusing on full-body exercises to get the blood flowing and boost metabolism for the day ahead.",
      status: "completed",
      date: "January 31, 2025",
      priority: "minimal",
    },
  ]);

  const [expandedSections, setExpandedSections] = useState({
    high: true,
    low: true,
    minimal: true,
  });

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
