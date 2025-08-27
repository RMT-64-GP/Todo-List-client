import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CollaborativeTaskProvider } from "./context/CollaborativeTaskContext";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/Tasks";
import CollaboratePage from "./pages/CollaboratePage";

export default function App() {
  return (
    <AuthProvider>
      <CollaborativeTaskProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/collaborate" element={<CollaboratePage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CollaborativeTaskProvider>
    </AuthProvider>
  );
}
