import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Welcome to ✨ Tasks
          {isAuthenticated && (
            <span className="block text-2xl text-slate-600 dark:text-slate-300 mt-2">
              Hello, {user?.name}!
            </span>
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          {isAuthenticated
            ? "Your collaborative task management solution"
            : "Manage your personal tasks or sign in to collaborate with others"}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/tasks"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-all hover:scale-105"
          >
            {isAuthenticated ? "My Tasks" : "Start with Personal Tasks"}
          </Link>
          {isAuthenticated && (
            <Link
              to="/collaborate"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition-all hover:scale-105"
            >
              Collaborate with Friends
            </Link>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Personal Tasks */}
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition">
          <div className="text-3xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Personal Tasks
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Create and manage your personal tasks offline
          </p>
        </div>

        {/* Collaboration */}
        <div
          className={`text-center p-6 rounded-lg shadow-sm border transition ${
            isAuthenticated
              ? "bg-white dark:bg-gray-800 border-slate-200 dark:border-slate-700 hover:shadow-md"
              : "bg-slate-50 dark:bg-gray-900 border-slate-300 dark:border-slate-700 opacity-60"
          }`}
        >
          <div className="text-3xl mb-4">🤝</div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Collaborate {!isAuthenticated && "(Login Required)"}
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Work together with friends using room meeting codes
          </p>
        </div>

        {/* Real-time Sync */}
        <div
          className={`text-center p-6 rounded-lg shadow-sm border transition ${
            isAuthenticated
              ? "bg-white dark:bg-gray-800 border-slate-200 dark:border-slate-700 hover:shadow-md"
              : "bg-slate-50 dark:bg-gray-900 border-slate-300 dark:border-slate-700 opacity-60"
          }`}
        >
          <div className="text-3xl mb-4">🚀</div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Real-time Sync {!isAuthenticated && "(Login Required)"}
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Keep your collaborative tasks synced in real-time
          </p>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="mt-12 text-center p-6 bg-blue-50 dark:bg-blue-900/40 rounded-lg border border-blue-200 dark:border-blue-700">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Want to collaborate with friends?
          </h3>
          <p className="text-blue-600 dark:text-blue-300 mb-4">
            Sign in to unlock collaborative features and work together on tasks
            using room meeting codes.
          </p>
          <Link
            to="/login"
            className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-all hover:scale-105"
          >
            🔑 Sign In Now
          </Link>
        </div>
      )}
    </div>
  );
}
