import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleSignInButton from "./GoogleSignInButton";

export default function Navigation() {
  const { user, isAuthenticated, signOut, isLoading } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold text-slate-800 hover:text-slate-600 transition-colors"
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
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-white/50 transition-all duration-200"
                >
                  Collaborate
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {user?.picture && (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="text-sm font-medium text-slate-700">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={signOut}
                    className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <GoogleSignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
