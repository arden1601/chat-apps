import { useRef, useState } from "react";

export default function MessageInput({ onSend }) {
    const [text, setText] = useState("");
    const textareaRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

    const submit = () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend?.(trimmed);
        setText("");
        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleInput = (e) => {
        const el = e.target;
        setText(el.value);
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 120) + "px";
    };

    return (
        <div className="flex items-end gap-2 px-4 py-3 bg-gray-700 border-t border-gray-800 flex-shrink-0">
            <textarea
                ref={textareaRef}
                rows={1}
                value={text}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Type a message"
                className="flex-1 resize-none bg-gray-600 text-gray-100 placeholder-gray-400 text-sm rounded-xl px-4 py-2 outline-none focus:ring-1 focus:ring-green-500 max-h-32 overflow-y-auto"
            />
            <button
                onClick={submit}
                disabled={!text.trim()}
                className="flex-shrink-0 w-9 h-9 rounded-full bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
                <svg
                    className="w-4 h-4 text-white translate-x-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
            </button>
        </div>
    );
}
