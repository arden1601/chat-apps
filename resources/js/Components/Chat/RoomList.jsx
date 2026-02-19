import RoomItem from "./RoomItem";

function SectionHeading({ label }) {
    return (
        <div className="px-4 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {label}
            </span>
        </div>
    );
}

export default function RoomList({
    data,
    search,
    activeRoom,
    onSelect,
    authUserId,
}) {
    const rooms = data?.rooms || [];
    const contacts = data?.contacts ? Object.values(data.contacts) : [];

    const hasRooms = rooms.length > 0;
    const hasContacts = contacts.length > 0;

    if (!hasRooms && !hasContacts) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <svg
                    className="w-10 h-10 text-gray-500 mb-3"
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
                <p className="text-gray-500 text-sm">
                    {search ? "No results found" : "No conversations yet"}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col overflow-y-auto">
            {hasRooms && (
                <>
                    {search && <SectionHeading label="Chats" />}
                    {rooms.map((room) => (
                        <RoomItem
                            key={`room-${room.id}`}
                            item={room}
                            isActive={activeRoom?.id === room.id}
                            onClick={onSelect}
                            authUserId={authUserId}
                        />
                    ))}
                </>
            )}

            {hasContacts && (
                <>
                    <SectionHeading label="Contacts" />
                    {contacts.map((contact) => (
                        <RoomItem
                            key={`contact-${contact.user_id}`}
                            item={contact}
                            isActive={
                                activeRoom?.user_id === contact.user_id &&
                                activeRoom?.type === "contact"
                            }
                            onClick={onSelect}
                            authUserId={authUserId}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
