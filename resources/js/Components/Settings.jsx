import Dropdown from "@/Components/Dropdown";
import axios from "axios";

export default function Settings({}) {
    const logout = () => {
        axios
            .post("/logout")
            .then((res) => {
                window.location.href = "/login";
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    type="button"
                    className="items-center justify-center py-2 rounded-md text-gray-200 hover:text-gray-500"
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
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                    </svg>
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Link onClick={logout}>Logout</Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
}
