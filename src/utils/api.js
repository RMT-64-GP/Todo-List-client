// src/utils/api.js
export async function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@test.com" && password === "123456") {
        localStorage.setItem("access_token", "fake-token-123")
        resolve({ access_token: "fake-token-123" })
      } else {
        reject(new Error("Email atau password salah"))
      }
    }, 500)
  })
}

export async function registerStaff({ email, password }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Akun berhasil didaftarkan", email })
    }, 500)
  })
}
