import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Navigation from "./components/Navigation"
import TasksPage from "./pages/Tasks"
import LoginPage from "./pages/LoginPage"
export default function App() {
  const isLoggedIn = !!localStorage.getItem("access_token")

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/tasks"
              element={
                isLoggedIn ? <TasksPage /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/tasks" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
