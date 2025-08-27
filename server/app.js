const express = require("express")

// Socket.io require
const { createServer } = require("http")
const { Server } = require("socket.io")

const port = 3000
const app = express()

// Instance for socket.io
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

// on connection -> triggered when new client connects
io.on("connection", async (socket) => {
  console.log("New user connected:", socket.handshake.auth.username)

  const sockets = await io.fetchSockets()
  const onlineUsers = sockets
    .map((s) => {
      return {
        socketId: s.id,
        username: s.handshake.auth.username,
      }
    })
    .filter((u) => !!u.username)

  // Broadcast online users to all clients
  io.emit("users:online", onlineUsers)

  // Send time updates every second
  setInterval(() => {
    socket.emit("time", new Date())
  }, 1000)

  // Handle task updates (for real-time collaboration)
  socket.on("task:update", (data) => {
    console.log("Task update:", data)
    // Broadcast task updates to other users
    socket.broadcast.emit("task:updated", data)
  })

  // Handle task creation
  socket.on("task:created", (data) => {
    console.log("New task created:", data)
    // Broadcast new task to other users
    socket.broadcast.emit("task:new", data)
  })

  // Handle task deletion
  socket.on("task:deleted", (data) => {
    console.log("Task deleted:", data)
    // Broadcast task deletion to other users
    socket.broadcast.emit("task:removed", data)
  })

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.handshake.auth.username)
    // Update online users list
    const updatedSockets = io.sockets.sockets
    const updatedOnlineUsers = Array.from(updatedSockets.values())
      .map((s) => ({
        socketId: s.id,
        username: s.handshake.auth.username,
      }))
      .filter((u) => !!u.username)

    io.emit("users:online", updatedOnlineUsers)
  })
})

app.get("/", (req, res) => {
  res.send("AI Tasks WebSocket Server is running!")
})

// app -> httpServer, for integration with socket.io
httpServer.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`)
})
