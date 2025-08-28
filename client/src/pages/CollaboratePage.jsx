import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCollaborativeTasks } from "../context/CollaborativeTaskContext";
import { Navigate } from "react-router-dom";
import CollaborativeTaskList from "../components/CollaborativeTaskList";

export default function CollaboratePage() {
  const { isAuthenticated } = useAuth();
  const { currentRoom, createRoom, joinRoom, leaveRoom } = useCollaborativeTasks();
  
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleCreateRoom = () => {
    const code = createRoom();
    setRoomCode(code);
  };

  const handleJoinRoom = () => {
    if (joinCode.trim()) {
      joinRoom(joinCode.toUpperCase());
      setJoinCode("");
    }
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    setRoomCode("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Collaborate with Friends
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Create or join a room to work on tasks together in real-time
        </p>
      </div>

      {!currentRoom ? (
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Create Room */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                Create a Room
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Start a new collaborative session
              </p>
            </div>

            {roomCode && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">Your room code:</p>
                <div className="text-2xl font-bold text-green-800 dark:text-green-200 tracking-wider">
                  {roomCode}
                </div>
                <p className="text-xs text-green-600 dark:text-green-300 mt-2">
                  Share this code with your friends
                </p>
              </div>
            )}

            <button
              onClick={handleCreateRoom}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white dark:text-white font-medium rounded-lg transition-colors"
            >
              {roomCode ? "Enter Room" : "Create Room"}
            </button>
          </div>

          {/* Join Room */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                Join a Room
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Enter a room code to join friends
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="joinCode"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Room Code
                </label>
                <input
                  type="text"
                  id="joinCode"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center tracking-wider text-lg font-mono bg-white dark:bg-gray-700 text-slate-800 dark:text-slate-100"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleJoinRoom}
                disabled={!joinCode.trim()}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:dark:bg-gray-600 disabled:cursor-not-allowed text-white dark:text-white font-medium rounded-lg transition-colors"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Room Active */
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 mb-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                Room Active: {currentRoom.code}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                You're now collaborating in real-time!
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-slate-600 dark:text-slate-300">Room Code:</span>
                <span className="font-mono text-lg font-bold text-slate-900 dark:text-slate-100">
                  {currentRoom.code}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-slate-600 dark:text-slate-300">Your Status:</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Connected</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => navigator.clipboard.writeText(currentRoom.code)}
                className="flex-1 px-4 py-2 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors"
              >
                Copy Room Code
              </button>

              <button
                onClick={handleLeaveRoom}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white dark:text-white rounded-lg transition-colors"
              >
                Leave Room
              </button>
            </div>
          </div>

          {/* Collaborative Tasks Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">
              Collaborative Tasks - Real Time
            </h4>
            <CollaborativeTaskList />
          </div>
        </div>
      )}
    </div>
  );
}
