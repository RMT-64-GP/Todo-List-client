import { useState } from "react"
import { useTasks } from "../context/TaskContext"

export default function TaskInput() {
  const [text, setText] = useState("")
  const [dueDate, setDueDate] = useState("")
  const { addTask } = useTasks()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return

    const username = localStorage.getItem("username") || "Anonymous"
    addTask(text.trim(), dueDate, username)
    setText("")
    setDueDate("")
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              What needs to be done?
            </label>
            <input
              className="w-full px-4 py-4 text-lg border-0 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 placeholder-slate-400"
              placeholder="Enter your task here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Due Date (Optional)
              </label>
              <input
                type="date"
                className="w-full px-4 py-4 text-lg border-0 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={!text.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
