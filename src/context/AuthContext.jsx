import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

// Hook to use auth context in components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  // State to track current user and loading status
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading=true

  // Check authentication status when app loads
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Function to check if user is authenticated
  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include", // Send HTTP-only cookies
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser({
          id: data.userId,
          email: data.email,
        });
      } else {
        // Not authenticated or token expired
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setCurrentUser(null);
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  // Function to handle login (called after successful login)
  const login = async (userData) => {
    setCurrentUser(userData);
  };

  // Function to handle logout
  const logout = async () => {
    try {
      // Call backend logout to clear cookies
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear user state, even if API call fails
      setCurrentUser(null);
    }
  };

  // Function to refresh auth status (useful after token refresh)
  const refreshAuthStatus = async () => {
    await checkAuthStatus();
  };

  // Values provided to all components
  const value = {
    currentUser, // Current user object or null
    login, // Function to set user after login
    logout, // Function to logout user
    isAuthenticated: !!currentUser, // Boolean: is user logged in?
    loading, // Boolean: is auth check in progress?
    checkAuthStatus, // Function to manually check auth
    refreshAuthStatus, // Function to refresh auth status
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}{" "}
      {/* Only render children when auth check is complete */}
    </AuthContext.Provider>
  );
}

export default AuthContext;
