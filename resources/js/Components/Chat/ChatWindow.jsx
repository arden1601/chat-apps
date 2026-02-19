import axios from "axios";
import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function ChatWindow({ room, authUserId, onRoomCreated }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!room || room.type === "contact") {
            setMessages([]);
            return;
        }
        setLoading(true);
        axios
            .get(`/rooms/${room.id}/messages`)
            .then((res) => setMessages(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [room?.id, room?.type]);

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

    const handleSend = async (text) => {
        let targetRoom = room;

        // If this is a contact (no room yet), create the private room first
        if (room.type === "contact") {
            try {
                const res = await axios.post("/rooms/private", {
                    user_id: room.user_id,
                });
                targetRoom = { ...room, id: res.data.room_id, type: "private" };
                onRoomCreated?.(targetRoom);
            } catch (e) {
                console.error(e);
                return;
            }
        }

        // Optimistic UI — append immediately with a temp id
        const tempId = `temp-${Date.now()}`;
        const optimistic = {
            id: tempId,
            message: text,
            sender_id: authUserId,
            created_at: new Date().toISOString(),
            type: "text",
            status: [],
        };
        setMessages((prev) => [...prev, optimistic]);

        axios
            .post(`/rooms/${targetRoom.id}/messages`, { message: text })
            .then((res) => {
                // Replace the optimistic entry with the confirmed server response
                setMessages((prev) =>
                    prev.map((m) => (m.id === tempId ? res.data : m)),
                );
            })
            .catch(() => {
                // Remove the optimistic entry on failure
                setMessages((prev) => prev.filter((m) => m.id !== tempId));
            });
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-800 min-w-0">
            <ChatHeader room={room} />
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Loading messages...</p>
                </div>
            ) : (
                <MessageList
                    messages={messages}
                    authUserId={authUserId}
                    isGroup={room?.type === "group"}
                />
            )}
            <MessageInput onSend={handleSend} />
        </div>
    );
}
