// frontend/pages/AdminLogs.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/logs");
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Chat Logs</h2>
      <div className="space-y-2 max-h-[600px] overflow-y-scroll border rounded p-4">
        {logs.map((log) => (
          <div key={log.id} className="border-b pb-2">
            <p>
              <strong>{log.username}</strong> ({log.sender}) @{" "}
              <em>{new Date(log.timestamp).toLocaleString()}</em>
            </p>
            <p className="ml-4">💬 {log.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
