// components/Navbar.jsx
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b pb-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-6">
          <NavLink
            to="/overview"
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
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
                isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
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
                isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
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
                isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
              }`
            }
          >
            <span className="material-icons text-sm">archive</span>
            Archived
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
