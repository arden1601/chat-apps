function Avatar({ name, avatar, size = "10" }) {
    if (avatar) {
        return (
            <img
                src={avatar}
                alt={name}
                className={`w-${size} h-${size} rounded-full object-cover flex-shrink-0`}
            />
        );
    }
    const initials = name
        ? name
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0].toUpperCase())
              .join("")
        : "?";

    return (
        <div
            className={`w-${size} h-${size} rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}
        >
            {initials}
        </div>
    );
}

function StatusTicks({ status }) {
    if (!status || status.length === 0) return null;

    const isRead = status.some((s) => s.status === "read");
    const color = isRead ? "text-blue-400" : "text-gray-400";

    return (
        <span className={`inline-flex items-center ${color}`}>
            {/* Double tick */}
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path
                    d="M1 8l4 4L15 3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 8l4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-2,0)"
                />
            </svg>
        </span>
    );
}

function formatTime(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    return date.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
}

export default function RoomItem({ item, isActive, onClick, authUserId }) {
    const isContact = item.type === "contact";
    const lastMsg = item.lastMessage;
    const isSentByMe = lastMsg && lastMsg.sender_id === authUserId;

    return (
        <button
            onClick={() => onClick(item)}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-600 transition-colors text-left ${
                isActive ? "bg-gray-600 border-l-2 border-green-500" : ""
            }`}
        >
            <Avatar name={item.name} avatar={item.avatar} />

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                    <span className="text-gray-100 text-sm font-medium truncate">
                        {item.name}
                    </span>
                    {lastMsg?.created_at && (
                        <span className="text-gray-400 text-xs flex-shrink-0 ml-1">
                            {formatTime(lastMsg.created_at)}
                        </span>
                    )}
                </div>
                <div className="flex justify-between items-center mt-0.5">
                    <p className="text-gray-400 text-xs truncate flex items-center gap-1">
                        {isContact ? (
                            <span className="text-green-400">New chat</span>
                        ) : lastMsg ? (
                            <>
                                {isSentByMe && (
                                    <StatusTicks status={lastMsg.status} />
                                )}
                                <span>{lastMsg.message}</span>
                            </>
                        ) : (
                            <span className="italic">No messages yet</span>
                        )}
                    </p>
                    {item.totalUnread > 0 && (
                        <span className="bg-green-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center flex-shrink-0 ml-1">
                            {item.totalUnread}
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
}
