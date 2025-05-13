import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto border border-gray-600 m-2 sm:m-5 h-[70vh] flex flex-col rounded">
      <h1 className="p-4 sm:p-5 border-b border-gray-600 text-base sm:text-lg font-semibold">Chat</h1>
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-base-200">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header text-xs sm:text-sm">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50"></time>
              </div>
              <div className="chat-bubble text-sm sm:text-base">{msg.text}</div>
              <div className="chat-footer opacity-50 text-xs">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-3 sm:p-5 border-t border-gray-600 flex items-center gap-2 bg-base-100">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2 text-sm sm:text-base bg-base-300"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="btn btn-secondary w-20 sm:w-auto">
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;