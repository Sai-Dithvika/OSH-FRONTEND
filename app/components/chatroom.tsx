"use client";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:9696";
const socket = io(SERVER_URL);

const ChatRoom = ({ roomId, userId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ user_id: string; msg: string }[]>(
    []
  );
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Join the room
    socket.emit("join_room", roomId);

    // Listen for new messages
    socket.on("receive_message", (newMessage) => {
      console.log("Received message:", newMessage);
      setMessages((prev) => [...prev, newMessage]); // Update state with new messages
    });

    return () => {
      socket.off("receive_message"); // Clean up on unmount
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { user_id: userId, msg: message };

      // Emit message to server
      socket.emit("send_message", { roomId, ...newMessage });

      setMessages((prev) => [...prev, newMessage]); // Update own state
      setMessage(""); // Clear input
    }
  };

  const getName = localStorage.getItem("username");

  return (
    <div className="h-[900px] flex bg-gray-100">
      {/* Left Sidebar - List of Users */}
      <div className="w-1/4 bg-white p-4 shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Users</h2>
          <ul>
            <li className="p-2 bg-blue-100 rounded mb-2">User 1</li>
            <li className="p-2 bg-blue-100 rounded mb-2">User 2</li>
            <li className="p-2 bg-blue-100 rounded">User 3</li>
          </ul>
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
          <h1 className="text-lg font-semibold">{getName}</h1>

          <div className="relative">
            <img
              src="/settings.png"
              className="w-5 h-5 cursor-pointer"
              alt="settings"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute bottom-10 right-0 mt-4 w-44 bg-white shadow-lg rounded-lg">
                <ul className="py-2">
                  <li className="px-4 py-4 hover:bg-red-200 cursor-pointer rounded-lg">
                    Leave Community
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Report
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4">Chat Interface</h2>
          {messages.map((msg, index) => (
            <p key={index} className="mb-2">
              <strong className="text-blue-500">{msg.user_id}:</strong>{" "}
              {msg.msg}
            </p>
          ))}
        </div>

        <div className="p-4 bg-gray-100 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md shadow-md"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-black text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
