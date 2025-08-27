import { Link, useLocation } from "react-router-dom"

export default function Navigation() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? "bg-white/20" : ""
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800">✨ Tasks</h1>
          <div className="flex space-x-2">
            <Link
              to="/tasks"
              className={`px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-white/50 transition-all duration-200 ${isActive(
                "/tasks"
              )}`}
            >
              Tasks
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
