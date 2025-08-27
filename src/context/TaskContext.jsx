import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../lib/firebase"
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"

const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [])

  async function addTask(text, dueDate, username) {
    await addDoc(collection(db, "tasks"), {
      text,
      dueDate,
      done: false,
      username,
      createdAt: new Date().toISOString(),
    })
  }

  async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id))
  }

  async function toggleTask(id) {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      await updateDoc(doc(db, "tasks", id), {
        done: !task.done,
      })
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}
