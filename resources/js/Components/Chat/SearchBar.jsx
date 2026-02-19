import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function SearchBar({ search }) {
    const [query, setQuery] = useState(search || "");
    const debounceRef = useRef(null);

    useEffect(() => {
        setQuery(search || "");
    }, [search]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            router.get(
                "/",
                { search: value || undefined },
                { preserveState: true, replace: true },
            );
        }, 400);
    };

    const handleClear = () => {
        setQuery("");
        router.get("/", {}, { preserveState: true, replace: true });
    };

    return (
        <div className="relative flex items-center w-full">
            <span className="absolute left-3 text-gray-400 pointer-events-none">
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    />
                </svg>
            </span>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search or start new chat"
                className="w-full bg-gray-600 text-gray-100 placeholder-gray-400 text-sm rounded-lg pl-9 pr-8 py-2 outline-none focus:ring-1 focus:ring-green-500"
            />
            {query && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 text-gray-400 hover:text-gray-200 transition-colors"
                >
                    <svg
                        className="w-4 h-4"
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
            )}
        </div>
    );
}
