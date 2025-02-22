'use client'
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSession } from "next-auth/react";
import ChatRoom from "../components/chatroom";
const SERVER_URL = "http://localhost:9696";
const socket = io(SERVER_URL);
const JoinRoom = ({ onJoin }) => {
    const [roomId, setRoomId] = useState("");
    const [userId, setUserId] = useState("");

  useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) setUserId(storedUser);
        const storedRoom = localStorage.getItem("room_id");
        if (storedRoom) setRoomId(storedRoom);
    }, []);

    const handleJoin = () => {
        if (roomId && userId) {
            localStorage.setItem("username", userId);
            localStorage.setItem("room_id", roomId);
            onJoin({ room_id: roomId, user_id: userId });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h3 className="text-2xl font-bold text-red-500 mb-4 animate-bounce">TO JOIN ROOM KINDLY VERIFY YOUR USERNAME IS CORRECT?</h3>
            <div className="space-y-4 w-1/2 max-w-md">
                <input
                    type="text"
                    placeholder="Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                />
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
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

const Page = () => {
    const { data: session } = useSession();
    const [roomId, setRoomId] = useState("");
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        return () => {
            socket.off("message");
        };
    }, [socket]);
    console.log("from"+messages);
    
    useEffect(() => {
        if (session?.user?.name) {
            localStorage.setItem("username", session.user.name);
            setUserId(session.user.name);
        }
    }, [session]);


    const joinRoom = ({ room_id, user_id }) => {
        setRoomId(room_id);
        setUserId(user_id);
        socket.emit("joinRoom", { user_id, room_id });
    };

    const sendMessage = () => {
        if (message && roomId) {
            socket.emit("message", { user_id: userId, room_id: roomId, msg: message, user_email: "user@example.com" });
            setMessage("");
        }
    };

    return session?.user ? (!roomId ? <JoinRoom onJoin={joinRoom} /> : <ChatRoom roomId={roomId} userId={userId} onSendMessage={sendMessage} messages={messages} message={message} setMessage={setMessage} />) : <div>Please log in</div>;
};

export default Page;
