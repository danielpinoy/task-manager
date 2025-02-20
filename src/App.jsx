// App.jsx
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Taskmanager from "@pages/taskmanager/Taskmanager";
import Priority from "@pages/priority/Priority";
import Count from "@pages/count/Count";
import Navbar from "@/components/navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="mx-auto px-4 py-8">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<Taskmanager />} />
            <Route path="/priority" element={<Priority />} />
            <Route path="/count" element={<Count />} />
            <Route
              path="/archived"
              element={<div>Archived View Coming Soon</div>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
