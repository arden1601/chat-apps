import ChatWindow from "@/Components/Chat/ChatWindow";
import Sidebar from "@/Components/Chat/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ auth, data, search }) {
    const [activeRoom, setActiveRoom] = useState(null);

    return (
        <AuthenticatedLayout>
            <Head title="Chat Apps" />
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar — fixed width */}
                <div className="w-80 flex-shrink-0 flex flex-col h-full">
                    <Sidebar
                        data={data}
                        search={search}
                        activeRoom={activeRoom}
                        onSelect={setActiveRoom}
                        authUserId={auth?.user?.id}
                    />
                </div>

                {/* Chat window — fills remaining space */}
                <ChatWindow room={activeRoom} authUserId={auth?.user?.id} />
            </div>
        </AuthenticatedLayout>
    );
}
