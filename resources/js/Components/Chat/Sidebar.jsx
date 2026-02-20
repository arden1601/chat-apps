import { useState } from "react";
import Settings from "@/Components/Settings";
import CreateGroupModal from "./CreateGroupModal";
import RoomList from "./RoomList";
import SearchBar from "./SearchBar";

export default function Sidebar({
    data,
    search,
    activeRoom,
    onSelect,
    authUserId,
    onGroupCreated,
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="w-full h-full flex flex-col bg-gray-700 border-r border-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 flex-shrink-0">
                <h1 className="text-white text-lg font-bold tracking-tight">
                    Chat Apps
                </h1>
                <div className="flex items-center gap-2">
                    {/* New group button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-gray-400 hover:text-white transition-colors"
                        title="New group"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
                            />
                        </svg>
                    </button>
                    <Settings />
                </div>
            </div>

            {/* Search bar */}
            <div className="px-3 py-2 flex-shrink-0">
                <SearchBar search={search} />
            </div>

            {/* Room / Contact list */}
            <div className="flex-1 overflow-y-auto">
                <RoomList
                    data={data}
                    search={search}
                    activeRoom={activeRoom}
                    onSelect={onSelect}
                    authUserId={authUserId}
                />
            </div>

            {/* Group creation modal */}
            {showModal && (
                <CreateGroupModal
                    onClose={() => setShowModal(false)}
                    onCreated={(room) => {
                        setShowModal(false);
                        onGroupCreated?.(room);
                    }}
                />
            )}
        </div>
    );
}
