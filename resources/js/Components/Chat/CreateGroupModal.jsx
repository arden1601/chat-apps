import axios from "axios";
import { useState } from "react";

export default function CreateGroupModal({ onClose, onCreated }) {
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearch(value);
        if (!value.trim()) {
            setResults([]);
            return;
        }
        try {
            const res = await axios.get("/", { params: { search: value } });
            setResults(res.data?.props?.data?.contacts ?? []);
        } catch {
            setResults([]);
        }
    };

    const toggle = (user) => {
        setSelected((prev) =>
            prev.find((u) => u.user_id === user.user_id)
                ? prev.filter((u) => u.user_id !== user.user_id)
                : [...prev, user],
        );
    };

    const submit = async () => {
        if (!name.trim() || selected.length === 0) return;
        setLoading(true);
        try {
            const res = await axios.post("/rooms/group", {
                name,
                user_ids: selected.map((u) => u.user_id),
            });
            onCreated?.(res.data);
            onClose();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold text-base">
                        New Group
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Group name */}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Group name"
                    className="bg-gray-700 text-gray-100 placeholder-gray-400 text-sm rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
                />

                {/* Member search */}
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search members to add…"
                    className="bg-gray-700 text-gray-100 placeholder-gray-400 text-sm rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
                />

                {/* Search results */}
                {results.length > 0 && (
                    <div className="bg-gray-700 rounded-lg overflow-hidden max-h-40 overflow-y-auto">
                        {results.map((user) => {
                            const isSelected = selected.find(
                                (u) => u.user_id === user.user_id,
                            );
                            return (
                                <button
                                    key={user.user_id}
                                    onClick={() => toggle(user)}
                                    className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-600 transition-colors text-left ${isSelected ? "bg-gray-600" : ""}`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                                        {user.name?.[0]?.toUpperCase()}
                                    </div>
                                    <span className="text-gray-100 text-sm">
                                        {user.name}
                                    </span>
                                    {isSelected && (
                                        <svg
                                            className="w-4 h-4 text-green-400 ml-auto"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Selected member chips */}
                {selected.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {selected.map((u) => (
                            <span
                                key={u.user_id}
                                className="flex items-center gap-1 bg-green-700 text-white text-xs rounded-full px-3 py-1"
                            >
                                {u.name}
                                <button
                                    onClick={() => toggle(u)}
                                    className="ml-1 hover:text-gray-300"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                {/* Submit */}
                <button
                    onClick={submit}
                    disabled={!name.trim() || selected.length === 0 || loading}
                    className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                >
                    {loading ? "Creating..." : "Create Group"}
                </button>
            </div>
        </div>
    );
}
