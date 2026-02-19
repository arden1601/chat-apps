function Avatar({ name, avatar, size = "10" }) {
    if (avatar) {
        return (
            <img
                src={avatar}
                alt={name}
                className={`w-${size} h-${size} rounded-full object-cover`}
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
            className={`w-${size} h-${size} rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold`}
        >
            {initials}
        </div>
    );
}

export default function ChatHeader({ room }) {
    const isGroup = room?.type === "group";

    return (
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-700 border-b border-gray-800 flex-shrink-0">
            <Avatar name={room?.name} avatar={room?.avatar} />
            <div className="flex flex-col">
                <span className="text-gray-100 font-semibold text-sm leading-tight">
                    {room?.name}
                </span>
                <span className="text-gray-400 text-xs">
                    {isGroup ? "Group chat" : "Online"}
                </span>
            </div>
        </div>
    );
}
