import { useState, useEffect } from "react"
import { socket } from "../lib/socket"
import TaskInput from "../components/TaskInput"
import TaskList from "../components/TaskList"
import AISummary from "../components/AISummary"

export default function TasksPage() {
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    // Listen for online users updates
    socket.on("users:online", (users) => {
      console.log("Online users:", users)
      setOnlineUsers(users)
    })

    // Set default username for this session
    if (!localStorage.getItem("username")) {
      const defaultUsername = `User_${Math.floor(Math.random() * 1000)}`
      localStorage.setItem("username", defaultUsername)

      // Update socket auth
      socket.auth = { username: defaultUsername }
      socket.disconnect().connect()
    } else {
      // Update socket auth with existing username
      socket.auth = { username: localStorage.getItem("username") }
      socket.disconnect().connect()
    }

    return () => {
      socket.off("users:online")
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-4 space-y-8">
            <TaskInput />
            <TaskList />
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-2 space-y-8">
            {/* Online Users */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="text-base font-semibold text-slate-700">
                  Online Users ({onlineUsers.length})
                </h3>
              </div>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div
                    key={user.socketId}
                    className="flex items-center space-x-3 text-sm text-slate-600"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-medium">{user.username}</span>
                  </div>
                ))}
                {onlineUsers.length === 0 && (
                  <p className="text-slate-400 text-sm italic">
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
