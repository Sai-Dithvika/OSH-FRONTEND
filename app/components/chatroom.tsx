import React, { useState } from "react";
const ChatRoom = ({ roomId, userId, onSendMessage, messages }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage({ room_id: roomId, user_id: userId, msg: message });
      setMessage("");
    }
  };
  const getName = localStorage.getItem("username")
  return (
    <div className="h-3/4 flex bg-gray-100">
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
        <div className="p-2 mt-4 bg-gray-200 text-center rounded-md cursor-pointer">Settings
        <h1 className="">{getName}</h1>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4">Chat Interface</h2>
          {messages.map((msg, index) => (
            <p key={index} className="mb-2">
              <strong className="text-blue-500">{msg.user_id}:</strong> {msg.msg}
            </p>
          ))}
        </div>

        {/* Message Input Area */}
        <div className="p-4 bg-gray-200 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md shadow-md"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
