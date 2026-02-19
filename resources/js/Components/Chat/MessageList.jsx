import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, authUserId, isGroup }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!messages || messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-sm italic">
                    No messages yet. Say hello!
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col">
            {messages.map((msg) => (
                <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwn={msg.sender_id === authUserId}
                    isGroup={isGroup}
                />
            ))}
            <div ref={bottomRef} />
        </div>
    );
}
