import { io } from "socket.io-client"

// Create socket.io client instance
export const socket = io("http://localhost:3000")
