import { useState, useEffect } from "react"
import { socket } from "../lib/socket"
import TaskInput from "../components/TaskInput"
import TaskList from "../components/TaskList"
import AISummary from "../components/AISummary"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext" 

export default function TasksPage() {
  const [onlineUsers, setOnlineUsers] = useState([])
  const [user, setUser] = useState(localStorage.getItem("username") || null)
  const navigate = useNavigate()
  const { darkMode } = useTheme()

  useEffect(() => {
    socket.on("users:online", (users) => {
      setOnlineUsers(users)
    })

    if (user) {
      socket.auth = { username: user }
      socket.disconnect().connect()
    }

    return () => {
      socket.off("users:online")
    }
  }, [user])

  function handleLogout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("username")
    setUser(null)
    socket.disconnect()
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Login/Logout */}
        <div className="flex justify-end mb-6">
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Hello, {user}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-4 space-y-8">
            <TaskInput />
            <TaskList />
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-2 space-y-8">
            {/* Online Users */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 dark:border-gray-700 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
                  Online Users ({onlineUsers.length})
                </h3>
              </div>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div
                    key={user.socketId}
                    className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-medium">{user.username}</span>
                  </div>
                ))}
                {onlineUsers.length === 0 && (
                  <p className="text-slate-400 dark:text-slate-500 text-sm italic">
                    No users currently online
                  </p>
                )}
              </div>
            </div>

            {/* AI Summary */}
            <AISummary />
          </div>
        </div>
      </div>
    </div>
  )
}
