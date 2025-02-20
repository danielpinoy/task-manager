// components/Navbar.jsx
import { NavLink } from "react-router-dom";
import CompactCount from "./CompactCount";
function Navbar() {
  // Mock data - in a real app, you might fetch this from an API or context
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

  return (
    <nav className="border-b pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              <span className="material-icons text-sm">menu</span>
              Overview
            </NavLink>

            <NavLink
              to="/priority"
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              <span className="material-icons text-sm">flag</span>
              Priority
            </NavLink>

            <NavLink
              to="/count"
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              <span className="material-icons text-sm">numbers</span>
              Count
            </NavLink>

            <NavLink
              to="/archived"
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              <span className="material-icons text-sm">archive</span>
              Archived
            </NavLink>
          </div>

          {/* Count Chart with Legend */}
          <div className="flex items-center gap-3">
            <div className="flex gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>In progress</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span>Not started</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                <span>Completed</span>
              </div>
            </div>

            {/* Import CompactCount component */}
            <CompactCount tasks={mockTasks} size={48} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
