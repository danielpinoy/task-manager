import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Taskmanager from "./pages/taskmanager/Taskmanager";
// import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      {/* Routes define our application's different pages */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Taskmanager />} />
          {/* <Route path="/" element={<TaskManagerPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
