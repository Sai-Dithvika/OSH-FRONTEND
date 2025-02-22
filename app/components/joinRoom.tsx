import React, { useState } from "react";

const JoinRoom = ({ onJoin }) => {
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");

  const getUser = () => {
    const user = localStorage.getItem("username");
    if (user) {
      setUserId(user);
    }
  };
  const getRoom = () => {
    const room = localStorage.getItem("room_id");
    if (room) {
      setRoomId(room);
    }
  };
  const handleJoin = () => {
    if (roomId && userId) {
      onJoin({ room_id: roomId, user_id: userId });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h3 className="text-2xl font-bold text-red-500 mb-4 animate-bounce">
        TO JOIN ROOM KINDLY VERIFY YOUR USERNAME IS CORRECT?
      </h3>
      <div className="space-y-4 w-1/2 max-w-md">
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
            localStorage.setItem("room_id", e.target.value);
          }}
          className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          onFocus={getRoom}
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            localStorage.setItem("username", e.target.value);
          }}
          className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          onFocus={getUser}
        />
        <button
          onClick={handleJoin}
          className="w-full p-3 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-300"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
