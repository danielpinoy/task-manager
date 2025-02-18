// App.jsx
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Taskmanager from "@pages/taskmanager/Taskmanager";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Taskmanager />} />
          <Route
            path="/priority"
            element={<div>Priority View Coming Soon</div>}
          />
          <Route path="/count" element={<div>Count View Coming Soon</div>} />
          <Route
            path="/archived"
            element={<div>Archived View Coming Soon</div>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
