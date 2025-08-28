
const express = require("express")
const cors = require("cors")

// Socket.io require
const { createServer } = require("http")
const { Server } = require("socket.io")

const port = 3000

const app = express()
app.use(cors())

// Instance for socket.io
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

// In-memory storage for rooms and tasks
const rooms = new Map()
const roomTasks = new Map()

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

  // Handle room creation
  socket.on("room:create", (data) => {
    const { roomCode, user } = data
    console.log(`Creating room ${roomCode} for user ${user.name}`)
    
    const room = {
      code: roomCode,
      owner: user.name,
      members: [{ id: socket.id, name: user.name }],
      createdAt: new Date().toISOString(),
    }
    
    rooms.set(roomCode, room)
    roomTasks.set(roomCode, [])
    
    socket.join(roomCode)
    socket.emit("room:joined", { room, tasks: [], members: room.members })
  })

  // Handle room joining
  socket.on("room:join", (data) => {
    const { roomCode, user } = data
    console.log(`User ${user.name} joining room ${roomCode}`)
    
    const room = rooms.get(roomCode)
    if (room) {
      const newMember = { id: socket.id, name: user.name }
      room.members.push(newMember)
      
      socket.join(roomCode)
      
      const tasks = roomTasks.get(roomCode) || []
      socket.emit("room:joined", { room, tasks, members: room.members })
      
      // Notify other members
      socket.to(roomCode).emit("room:member-joined", newMember)
    } else {
      socket.emit("room:error", { message: "Room not found" })
    }
  })

  // Handle room leaving
  socket.on("room:leave", (data) => {
    const { roomCode, user } = data
    console.log(`User ${user.name} leaving room ${roomCode}`)
    
    const room = rooms.get(roomCode)
    if (room) {
      room.members = room.members.filter(member => member.id !== socket.id)
      socket.leave(roomCode)
      
      // Notify other members
      socket.to(roomCode).emit("room:member-left", { id: socket.id, name: user.name })
      
      // If room is empty, clean it up
      if (room.members.length === 0) {
        rooms.delete(roomCode)
        roomTasks.delete(roomCode)
      }
    }
  })

  // Handle task updates (for real-time collaboration)
  socket.on("task:update", (data) => {
    console.log("Task update:", data)
    const { roomCode } = data
    
    if (roomCode) {
      // Update task in room storage
      const tasks = roomTasks.get(roomCode) || []
      const taskIndex = tasks.findIndex(task => task.id === data.id)
      if (taskIndex !== -1) {
        tasks[taskIndex] = data
        roomTasks.set(roomCode, tasks)
      }
      
      // Broadcast to room members only
      socket.to(roomCode).emit("task:updated", data)
    }
  })

  // Handle task creation
  socket.on("task:created", (data) => {
    console.log("New task created:", data)
    const { roomCode } = data
    
    if (roomCode) {
      // Add task to room storage
      const tasks = roomTasks.get(roomCode) || []
      tasks.push(data)
      roomTasks.set(roomCode, tasks)
      
      // Broadcast to room members only
      socket.to(roomCode).emit("task:new", data)
    }
  })

  // Handle task deletion
  socket.on("task:deleted", (data) => {
    console.log("Task deleted:", data)
    const { roomCode, id } = data
    
    if (roomCode) {
      // Remove task from room storage
      const tasks = roomTasks.get(roomCode) || []
      const filteredTasks = tasks.filter(task => task.id !== id)
      roomTasks.set(roomCode, filteredTasks)
      
      // Broadcast to room members only
      socket.to(roomCode).emit("task:removed", data)
    }
  })

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.handshake.auth.username)
    
    // Remove user from all rooms
    for (const [roomCode, room] of rooms.entries()) {
      const memberIndex = room.members.findIndex(member => member.id === socket.id)
      if (memberIndex !== -1) {
        const disconnectedMember = room.members[memberIndex]
        room.members.splice(memberIndex, 1)
        
        // Notify other room members
        socket.to(roomCode).emit("room:member-left", disconnectedMember)
        
        // Clean up empty rooms
        if (room.members.length === 0) {
          rooms.delete(roomCode)
          roomTasks.delete(roomCode)
        }
      }
    }
    
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
