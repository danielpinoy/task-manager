import "./App.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRouter from "./services/Route/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "@/components/navbar/Navbar";

function AppContent() {
  const location = useLocation();

  // Hide navbar on auth pages
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="app-container">
      <div className="mx-auto px-4 py-8">
        {!hideNavbar && <Navbar />}
        <AppRouter />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
