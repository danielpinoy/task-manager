// src/components/navbar/Navbar.jsx - Enhanced version
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import CompactCount from "./CompactCount";

function Navbar() {
  const { logout, currentUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
    }
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-1">
              <NavLink
                to="/overview"
                className={({ isActive }) =>
                  `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <span className="material-icons text-lg mr-2">dashboard</span>
                Overview
              </NavLink>

              <NavLink
                to="/priority"
                className={({ isActive }) =>
                  `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <span className="material-icons text-lg mr-2">flag</span>
                Priority
              </NavLink>

              <NavLink
                to="/count"
                className={({ isActive }) =>
                  `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <span className="material-icons text-lg mr-2">analytics</span>
                Analytics
              </NavLink>

              <NavLink
                to="/archived"
                className={({ isActive }) =>
                  `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <span className="material-icons text-lg mr-2">archive</span>
                Archive
              </NavLink>
            </div>
          </div>

          {/* Right side - Count Chart and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Task Count Visualization */}
            <div className="hidden lg:flex items-center space-x-4 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="flex space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Done</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Progress</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span>Todo</span>
                </div>
              </div>
              <CompactCount size={40} />
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {currentUser?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {currentUser?.name || currentUser?.email?.split("@")[0]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {currentUser?.email}
                  </div>
                </div>
                <span className="material-icons text-lg text-gray-400">
                  {dropdownOpen ? "expand_less" : "expand_more"}
                </span>
              </button>

              {/* Enhanced Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                  {/* User Info Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {currentUser?.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {currentUser?.name ||
                            currentUser?.email?.split("@")[0]}
                        </div>
                        <div className="text-xs text-gray-500">
                          {currentUser?.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        // Add profile functionality later
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
                    >
                      <span className="material-icons text-lg text-gray-400">
                        person
                      </span>
                      <div>
                        <div className="font-medium">Profile Settings</div>
                        <div className="text-xs text-gray-500">
                          Manage your account
                        </div>
                      </div>
                    </button>

                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-150"
                      >
                        <span className="material-icons text-lg">logout</span>
                        <div>
                          <div className="font-medium">Sign out</div>
                          <div className="text-xs text-red-500">
                            End your session
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
          <div className="flex flex-wrap gap-2">
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="material-icons text-lg mr-1">dashboard</span>
              Overview
            </NavLink>
            <NavLink
              to="/priority"
              className={({ isActive }) =>
                `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="material-icons text-lg mr-1">flag</span>
              Priority
            </NavLink>
            <NavLink
              to="/count"
              className={({ isActive }) =>
                `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="material-icons text-lg mr-1">analytics</span>
              Analytics
            </NavLink>
          </div>
        </div>
      </div>

      {/* Backdrop for dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;
