import Settings from "@/Components/Settings";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
export default function Welcome({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Welcome" />
            <div className="flex h-screen">
                <div className="w-2/6 bg-gray-500 border-r border-gray-800">
                    <div className="px-4 flex flex-col">
                        <div className="flex justify-between mb-2">
                            <h1 className="text-white text-xl font-bold">
                                Chat APPPS
                            </h1>
                            <div className="">
                                <Settings />
                            </div>
                        </div>
                        <div># SEARCH #</div>
                    </div>
                    <div className="flex-1 px-4 overflow-y-auto"># ROOM #</div>
                </div>
                <div className="relative w-4/6 bg-gray-400"># CHAT #</div>
            </div>
        </AuthenticatedLayout>
    );
}
