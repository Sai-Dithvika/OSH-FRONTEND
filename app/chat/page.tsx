"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import JoinRoom from "../components/joinRoom";
import UserActions from "../components/userAction";
import ChatRoom from "../components/chatroom";
const socket = io("http://localhost:9696");

const Page = () => {
  const { data: session } = useSession();
  console.log(session?.user?.name);
  if (session?.user?.name) {
    localStorage.setItem("username", session.user.name);
  }
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data: any) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("alert", (data) => {
      alert(data.msg);
    });

    return () => {
      socket.off("message");
      socket.off("alert");
    };
  }, []);

  const handleJoinRoom = (data: any) => {
    setRoomId(data.room_id);
    setUserId(data.user_id);
    socket.emit("joinRoom", data);
  };

  const handleSendMessage = (data) => {
    socket.emit("message", data);
  };

  const handleBlockUser = (data) => {
    socket.emit("block_user", data);
  };

  const handlePrivilegeLift = (data) => {
    socket.emit("priviledge_lift", data);
  };
  return (
    <>
      {session?.user ? (
        <div>
          {!roomId ? (
            <JoinRoom onJoin={handleJoinRoom} />
          ) : (
            <>
              <ChatRoom
                roomId={roomId}
                userId={userId}
                onSendMessage={handleSendMessage}
                messages={messages}
              />
            </>
          )}
        </div>
      ) : (
        <div>please log in</div>
      )}
    </>
  );
};

export default Page;
