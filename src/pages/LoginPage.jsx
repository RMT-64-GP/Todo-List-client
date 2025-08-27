import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login, registerStaff } from "../utils/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login({ email, password })
      navigate("/tasks")
    } catch (err) {
      alert(err.message || "Login gagal")
    }
  }

  const handleRegister = async () => {
    try {
      await registerStaff({ email, password })
      alert("Akun berhasil didaftarkan, silakan login")
    } catch (err) {
      alert(err.message || "Gagal daftar akun")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleRegister}
          className="mt-4 w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
        >
          Daftar Akun
        </button>
      </div>
    </div>
  )
}
