// App.jsx
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./services/Route/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "@/components/navbar/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <div className="mx-auto px-4 py-8">
            <Navbar />
            <AppRouter />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
