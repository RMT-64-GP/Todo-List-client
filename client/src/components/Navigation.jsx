import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; 
import GoogleSignInButton from "./GoogleSignInButton";

export default function Navigation() {
  const { user, isAuthenticated, signOut, isLoading } = useAuth();
  const { darkMode, toggleTheme } = useTheme(); 

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold text-slate-800 dark:text-slate-100 hover:text-slate-600 dark:hover:text-gray-300 transition-colors"
          >
            ✨ Tasks
          </Link>

          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="px-4 py-2 text-sm text-slate-500">Loading...</div>
            ) : isAuthenticated ? (
              <>
                <Link
                  to="/collaborate"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                >
                  Collaborate
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {(user?.picture || user?.photoURL) ? (
                      <img
                        src={user.picture || user.photoURL}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3b82f6&color=fff`;
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={signOut}
                    className="px-3 py-1 text-xs bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-slate-200 rounded transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <GoogleSignInButton />
            )}

            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-gray-700 text-slate-800 dark:text-slate-200 text-sm transition-colors"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
