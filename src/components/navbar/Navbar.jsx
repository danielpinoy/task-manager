import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CompactCount from "./CompactCount";
function Navbar() {
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    // Simple confirmation
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
      // AuthContext and AppRouter will handle the redirect automatically
    }
  };

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

          {/* User Info */}
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="material-icons text-sm">account_circle</span>
            <span>Welcome, {currentUser?.email?.split("@")[0]}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Logout"
          >
            <span className="material-icons text-sm">logout</span>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
