import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CollaborativeTaskProvider } from "./context/CollaborativeTaskContext";
import { ThemeProvider } from "./context/ThemeContext"; 
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/Tasks";
import CollaboratePage from "./pages/CollaboratePage";

export default function App() {
  return (
    <AuthProvider>
      <CollaborativeTaskProvider>
        <ThemeProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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
        </ThemeProvider>
      </CollaborativeTaskProvider>
    </AuthProvider>
  );
}
