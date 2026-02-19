import Settings from "@/Components/Settings";
import RoomList from "./RoomList";
import SearchBar from "./SearchBar";

export default function Sidebar({
    data,
    search,
    activeRoom,
    onSelect,
    authUserId,
}) {
    return (
        <div className="w-full h-full flex flex-col bg-gray-700 border-r border-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 flex-shrink-0">
                <h1 className="text-white text-lg font-bold tracking-tight">
                    Chat Apps
                </h1>
                <Settings />
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
        </div>
    );
}
