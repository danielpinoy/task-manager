// src/services/Api.jsx

// Sample task data
export const sampleTasks = [
  {
    id: "1",
    title: "Organize Digital Files",
    description:
      "Need to pick up groceries for the week, including fresh produce, snacks, and household essentials for daily meals and meal prep.",
    status: "not-started",
    date: "January 28, 2025",
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
      "A quick 30-minute workout to start the day with energy, focusing on full-body exercises to get the blood flowing and boost metabolism for the day ahead.",
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
      "Organizing and cleaning the apartment for a fresh start, which includes decluttering, dusting, vacuuming, and ensuring all areas are tidy for a cleaner living environment.",
    status: "completed",
    date: "January 31, 2025",
    priority: "minimal",
  },
];

// Helper functions

// Get tasks by status
export const getTasksByStatus = (status) => {
  return sampleTasks.filter((task) => task.status === status);
};

// Get tasks by priority
export const getTasksByPriority = (priority) => {
  return sampleTasks.filter((task) => task.priority === priority);
};

// Get counts of tasks by status
export const getTaskStatusCounts = () => {
  return {
    completed: sampleTasks.filter((task) => task.status === "completed").length,
    inProgress: sampleTasks.filter((task) => task.status === "in-progress")
      .length,
    notStarted: sampleTasks.filter((task) => task.status === "not-started")
      .length,
    total: sampleTasks.length,
  };
};
