import { useState } from "react";
import { useCollaborativeTasks } from "../context/CollaborativeTaskContext";
import RealTimeIndicator from "./RealTimeIndicator";

export default function CollaborativeTaskList() {
  const {
    collaborativeTasks,
    addCollaborativeTask,
    toggleCollaborativeTask,
    deleteCollaborativeTask,
    roomMembers,
  } = useCollaborativeTasks();

  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addCollaborativeTask(newTask.trim(), dueDate);
      setNewTask("");
      setDueDate("");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Real-time Status */}
      <div className="flex justify-between items-center">
        <div>
          <h5 className="font-medium text-slate-800">Real-time Collaboration</h5>
          <p className="text-sm text-slate-600">Tasks update instantly across all connected devices</p>
        </div>
        <RealTimeIndicator />
      </div>

      {/* Room Members */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h5 className="font-medium text-blue-800 mb-2">
          Room Members ({roomMembers.length})
        </h5>
        <div className="flex flex-wrap gap-2">
          {roomMembers.map((member, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {member.name}
            </span>
          ))}
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Add New Task
          </label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Due Date (Optional)
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        <h5 className="font-medium text-slate-800">
          Collaborative Tasks ({collaborativeTasks.length})
        </h5>

        {collaborativeTasks.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <div className="text-3xl mb-2">📝</div>
            <p>No tasks yet. Add one above to get started!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {collaborativeTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg transition-all ${
                  task.done
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleCollaborativeTask(task.id)}
                      className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    
                    <div className="flex-1">
                      <p
                        className={`${
                          task.done
                            ? "line-through text-slate-500"
                            : "text-slate-800"
                        }`}
                      >
                        {task.text}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                        <span>By: {task.username}</span>
                        
                        {task.dueDate && (
                          <span>
                            Due: {formatDate(task.dueDate)} at {formatTime(task.dueDate)}
                          </span>
                        )}
                        
                        <span>
                          Created: {formatTime(task.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteCollaborativeTask(task.id)}
                    className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                    title="Delete task"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
