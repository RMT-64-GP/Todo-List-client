import { useTasks } from "../context/TaskContext"

export default function TaskList() {
  const { tasks, deleteTask, toggleTask } = useTasks()

  if (tasks.length === 0) {
    return (
      <div className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 dark:border-slate-700 p-12 text-center">
        <div className="text-slate-300 dark:text-slate-400 text-6xl mb-4">✨</div>
        <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-200 mb-2">
          No tasks yet
        </h3>
        <p className="text-slate-500 dark:text-slate-300">
          Start by adding your first task above!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 dark:border-slate-700 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Your Tasks</h2>
        <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`group p-4 rounded-xl transition-all duration-200 hover:shadow-md ${
              task.done
                ? "bg-green-50/50 dark:bg-green-900/40 border border-green-200/50 dark:border-green-700/50"
                : "bg-white/50 dark:bg-slate-700/40 border border-slate-200/50 dark:border-slate-600/50 hover:border-slate-300/50 dark:hover:border-slate-500/50"
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 pt-1">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 text-green-600 dark:text-green-400 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 transition-all duration-200"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span
                      className={`block text-lg font-medium transition-all duration-200 ${
                        task.done
                          ? "line-through text-slate-400 dark:text-slate-500"
                          : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {task.text}
                    </span>

                    <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500 dark:text-slate-300">
                      {task.dueDate && (
                        <span className="flex items-center space-x-1">
                          <span className="text-slate-400 dark:text-slate-500">📅</span>
                          <span>{task.dueDate}</span>
                        </span>
                      )}
                      {task.username && (
                        <span className="flex items-center space-x-1">
                          <span className="text-slate-400 dark:text-slate-500">👤</span>
                          <span>{task.username}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-lg transition-all duration-200 ml-2"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
