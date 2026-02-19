import { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function ChatWindow({ room, authUserId }) {
    const [messages, setMessages] = useState([]);

    if (!room) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-800 gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>
                <div className="text-center">
                    <p className="text-gray-300 font-semibold text-base">
                        Chat Apps
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                        Select a conversation to start chatting
                    </p>
                </div>
            </div>
        );
    }

    const handleSend = (text) => {
        // Optimistic local message — real sending handled later with WebSockets
        const newMsg = {
            id: Date.now(),
            message: text,
            sender_id: authUserId,
            created_at: new Date().toISOString(),
            type: "text",
            status: [],
        };
        setMessages((prev) => [...prev, newMsg]);
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-800 min-w-0">
            <ChatHeader room={room} />
            <MessageList messages={messages} authUserId={authUserId} />
            <MessageInput onSend={handleSend} />
        </div>
    );
}
