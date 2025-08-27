import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (email === "admin@mail.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true")
      navigate("/tasks")
    } else {
      setError("Email atau password salah!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center">
          🔐 Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white/60 dark:bg-gray-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white/60 dark:bg-gray-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
