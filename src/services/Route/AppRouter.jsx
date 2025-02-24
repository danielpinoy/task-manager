import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Pages
import Taskmanager from "@pages/taskmanager/Taskmanager";
import Priority from "@pages/priority/Priority";
import Count from "@pages/count/Count";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/overview" replace /> : <Login />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/overview" replace /> : <Register />
        }
      />
      {/* Protected routes */}
      <Route path="/" element={<Navigate to="/overview" replace />} />

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
            <div>Archived View Coming Soon</div>
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default AppRouter;
