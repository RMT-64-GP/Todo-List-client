import { useState, useEffect } from "react";
import { socket } from "../lib/socket";

export default function RealTimeIndicator() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleTaskUpdate = () => {
      setLastUpdate(new Date());
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("task:new", handleTaskUpdate);
    socket.on("task:updated", handleTaskUpdate);
    socket.on("task:removed", handleTaskUpdate);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("task:new", handleTaskUpdate);
      socket.off("task:updated", handleTaskUpdate);
      socket.off("task:removed", handleTaskUpdate);
    };
  }, []);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex items-center space-x-1">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className={isConnected ? "text-green-600" : "text-red-600"}>
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      
      {lastUpdate && (
        <div className="text-slate-500">
          Last update: {lastUpdate.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
