function formatTime(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function StatusTicks({ status }) {
    if (!status || status.length === 0) {
        // Single tick = sent but no status record yet
        return (
            <svg
                className="w-3.5 h-3.5 text-gray-400 inline"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M2 8l4 4L14 4" />
            </svg>
        );
    }

    const isRead = status.some((s) => s.status === "read");
    const color = isRead ? "text-blue-400" : "text-gray-400";

    return (
        <svg
            className={`w-4 h-4 ${color} inline`}
            viewBox="0 0 20 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* first tick */}
            <path d="M1 8l4 4L13 4" />
            {/* second tick shifted */}
            <path d="M7 8l4 4 6-8" />
        </svg>
    );
}

export default function MessageBubble({ message, isOwn }) {
    return (
        <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-1`}>
            <div
                className={`relative max-w-xs lg:max-w-md px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    isOwn
                        ? "bg-green-700 text-gray-100 rounded-tr-sm"
                        : "bg-gray-600 text-gray-100 rounded-tl-sm"
                }`}
            >
                <p className="break-words whitespace-pre-wrap pr-12">
                    {message.message}
                </p>
                <span className="absolute bottom-1.5 right-2 flex items-center gap-1 text-xs text-gray-300 whitespace-nowrap">
                    {formatTime(message.created_at)}
                    {isOwn && (
                        <StatusTicks status={message.lastMessage?.status} />
                    )}
                </span>
            </div>
        </div>
    );
}
