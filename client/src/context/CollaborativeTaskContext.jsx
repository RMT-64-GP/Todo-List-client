import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { useAuth } from "./AuthContext";

const CollaborativeTaskContext = createContext();

export function CollaborativeTaskProvider({ children }) {
  const { user } = useAuth();
  const [collaborativeTasks, setCollaborativeTasks] = useState([]);
  const [roomMembers, setRoomMembers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    // Connect socket with user authentication
    if (user) {
      socket.auth = { username: user.name };
      socket.connect();
    }

    // Listen for room updates
    socket.on("room:joined", (roomData) => {
      setCurrentRoom(roomData.room);
      setCollaborativeTasks(roomData.tasks || []);
      setRoomMembers(roomData.members || []);
    });

    socket.on("room:member-joined", (memberData) => {
      setRoomMembers(prev => [...prev, memberData]);
    });

    socket.on("room:member-left", (memberData) => {
      setRoomMembers(prev => prev.filter(member => member.id !== memberData.id));
    });

    // Listen for real-time task updates
    socket.on("task:new", (taskData) => {
      setCollaborativeTasks(prev => [...prev, taskData]);
    });

    socket.on("task:updated", (taskData) => {
      setCollaborativeTasks(prev => 
        prev.map(task => task.id === taskData.id ? taskData : task)
      );
    });

    socket.on("task:removed", (taskData) => {
      setCollaborativeTasks(prev => 
        prev.filter(task => task.id !== taskData.id)
      );
    });

    socket.on("room:tasks", (tasks) => {
      setCollaborativeTasks(tasks);
    });

    return () => {
      socket.off("room:joined");
      socket.off("room:member-joined");
      socket.off("room:member-left");
      socket.off("task:new");
      socket.off("task:updated");
      socket.off("task:removed");
      socket.off("room:tasks");
    };
  }, [user]);

  const joinRoom = (roomCode) => {
    socket.emit("room:join", { roomCode, user });
  };

  const createRoom = () => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    socket.emit("room:create", { roomCode, user });
    return roomCode;
  };

  const leaveRoom = () => {
    if (currentRoom) {
      socket.emit("room:leave", { roomCode: currentRoom.code, user });
      setCurrentRoom(null);
      setCollaborativeTasks([]);
      setRoomMembers([]);
    }
  };

  const addCollaborativeTask = (text, dueDate) => {
    if (!currentRoom) return;

    const newTask = {
      id: Date.now().toString(),
      text,
      dueDate,
      done: false,
      username: user.name,
      roomCode: currentRoom.code,
      createdAt: new Date().toISOString(),
    };

    // Optimistic update
    setCollaborativeTasks(prev => [...prev, newTask]);

    // Emit to server
    socket.emit("task:created", newTask);
  };

  const toggleCollaborativeTask = (taskId) => {
    if (!currentRoom) return;

    const task = collaborativeTasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, done: !task.done };
      
      // Optimistic update
      setCollaborativeTasks(prev => 
        prev.map(t => t.id === taskId ? updatedTask : t)
      );

      // Emit to server
      socket.emit("task:update", updatedTask);
    }
  };

  const deleteCollaborativeTask = (taskId) => {
    if (!currentRoom) return;

    // Optimistic update
    setCollaborativeTasks(prev => prev.filter(t => t.id !== taskId));

    // Emit to server
    socket.emit("task:deleted", { id: taskId, roomCode: currentRoom.code });
  };

  return (
    <CollaborativeTaskContext.Provider
      value={{
        collaborativeTasks,
        roomMembers,
        currentRoom,
        joinRoom,
        createRoom,
        leaveRoom,
        addCollaborativeTask,
        toggleCollaborativeTask,
        deleteCollaborativeTask,
      }}
    >
      {children}
    </CollaborativeTaskContext.Provider>
  );
}

export function useCollaborativeTasks() {
  const context = useContext(CollaborativeTaskContext);
  if (!context) {
    throw new Error("useCollaborativeTasks must be used within a CollaborativeTaskProvider");
  }
  return context;
}
