// src/services/Route/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Pages
import Taskmanager from "@pages/taskmanager/Taskmanager";
import Priority from "@pages/priority/Priority";
import Count from "@pages/count/Count";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
}

// Protected route wrapper component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
}

// Public route wrapper (only accessible when NOT logged in)
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // If already authenticated, redirect to overview
  if (isAuthenticated) {
    return <Navigate to="/overview" replace />;
  }

  // If not authenticated, render the public component (login/register)
  return children;
}

function AppRouter() {
  const { loading } = useAuth();

  // Show loading spinner while checking initial auth status
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public routes - only accessible when NOT logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/overview" replace />} />

      {/* Protected routes - only accessible when logged in */}
      <Route
        path="/overview"
        element={
          <ProtectedRoute>
            <Taskmanager />
          </ProtectedRoute>
        }
      />

      <Route
        path="/priority"
        element={
          <ProtectedRoute>
            <Priority />
          </ProtectedRoute>
        }
      />

      <Route
        path="/count"
        element={
          <ProtectedRoute>
            <Count />
          </ProtectedRoute>
        }
      />

      <Route
        path="/archived"
        element={
          <ProtectedRoute>
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-700">
                  Archived View
                </h1>
                <p className="text-gray-500 mt-2">Coming Soon...</p>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
