import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Navigation from "./components/Navigation"
import TasksPage from "./pages/Tasks"
import LoginPage from "./pages/LoginPage"

// Komponen wrapper untuk proteksi route
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            {/* Redirect default ke /tasks */}
            <Route path="/" element={<Navigate to="/tasks" replace />} />

            {/* Protected route */}
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TasksPage />
                </PrivateRoute>
              }
            />

            {/* Public route */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
