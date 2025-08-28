import { useState } from "react"
import { useCollaborativeTasks } from "../context/CollaborativeTaskContext"
import { useAuth } from "../context/AuthContext"
import RealTimeIndicator from "./RealTimeIndicator"

export default function CollaborativeTaskList() {
  const { user } = useAuth()
  const {
    collaborativeTasks,
    addCollaborativeTask,
    toggleCollaborativeTask,
    deleteCollaborativeTask,
    assignTask,
    roomMembers,
  } = useCollaborativeTasks()

  const [newTask, setNewTask] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [filter, setFilter] = useState("all") // all, assigned-to-me, unassigned

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      addCollaborativeTask(newTask.trim(), dueDate, assignedTo || null)
      setNewTask("")
      setDueDate("")
      setAssignedTo("")
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString()
  }

  const formatTime = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDueDateClass = (dueDate) => {
    if (!dueDate) return "text-slate-500 dark:text-slate-400"
    const now = new Date()
    const due = new Date(dueDate)
    if (due < now) return "text-red-500 font-medium"
    if (due.toDateString() === now.toDateString())
      return "text-orange-500 font-medium"
    return "text-slate-500 dark:text-slate-400"
  }

  const getFilteredTasks = () => {
    switch (filter) {
      case "assigned-to-me":
        return collaborativeTasks.filter(task => task.assignedTo === user?.name)
      case "unassigned":
        return collaborativeTasks.filter(task => !task.assignedTo)
      default:
        return collaborativeTasks
    }
  }

  const filteredTasks = getFilteredTasks()

  return (
    <div className="space-y-6">
      {/* Real-time Status */}
      <div className="flex justify-between items-center">
        <div>
          <h5 className="font-medium text-slate-800 dark:text-slate-100">
            Real-time Collaboration
          </h5>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tasks update instantly across all connected devices
          </p>
        </div>
        <RealTimeIndicator />
      </div>

      {/* Room Members */}
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
          Room Members ({roomMembers.length})
        </h5>
        <div className="flex flex-wrap gap-2">
          {roomMembers.map((member, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-sm"
            >
              {member.name}
            </span>
          ))}
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Add New Task
          </label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-100"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Due Date (Optional)
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Assign To (Optional)
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-100"
            >
              <option value="">Unassigned</option>
              {roomMembers.map((member, index) => (
                <option key={index} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h5 className="font-medium text-slate-800 dark:text-slate-100">
            Collaborative Tasks ({filteredTasks.length})
          </h5>
          
          {/* Task Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 dark:text-slate-400">
              Filter:
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-100"
            >
              <option value="all">All Tasks</option>
              <option value="assigned-to-me">Assigned to Me</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <div className="text-3xl mb-2">📝</div>
            <p>
              {filter === "assigned-to-me" 
                ? "No tasks assigned to you yet." 
                : filter === "unassigned"
                ? "No unassigned tasks."
                : "No tasks yet. Add one above to get started!"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg transition-all ${
                  task.done
                    ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700"
                    : "bg-white dark:bg-gray-800 border-slate-200 dark:border-slate-700 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleCollaborativeTask(task.id)}
                      className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />

                    <div className="flex-1">
                      <p
                        className={`${
                          task.done
                            ? "line-through text-slate-500 dark:text-slate-400"
                            : "text-slate-800 dark:text-slate-100"
                        }`}
                      >
                        {task.text}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                          By: {task.username}
                        </span>

                        {task.assignedTo && (
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                            Assigned to: {task.assignedTo}
                          </span>
                        )}

                        {task.dueDate && (
                          <span className={getDueDateClass(task.dueDate)}>
                            Due: {formatDate(task.dueDate)} at{" "}
                            {formatTime(task.dueDate)}
                          </span>
                        )}

                        <span className="text-slate-400 dark:text-slate-500">
                          Created: {formatTime(task.createdAt)}
                        </span>
                      </div>

                      {/* Assignment Controls */}
                      <div className="mt-3 flex items-center gap-2">
                        <label className="text-xs text-slate-600 dark:text-slate-400">
                          Assign to:
                        </label>
                        <select
                          value={task.assignedTo || ""}
                          onChange={(e) => assignTask(task.id, e.target.value || null)}
                          className="text-xs px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-100"
                        >
                          <option value="">Unassigned</option>
                          {roomMembers.map((member, index) => (
                            <option key={index} value={member.name}>
                              {member.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteCollaborativeTask(task.id)}
                    className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                    title="Delete task"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
