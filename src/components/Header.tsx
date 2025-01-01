import { FaUser } from "react-icons/fa";
import { useUser } from "../contexts/UserContext.tsx";

function Header() {
  const { userData, clearUserData } = useUser();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-100 p-2">
          <FaUser />
        </div>
        <div>
          <h2 className="font-medium">
            {userData.username ? userData.username : "unknown"}
          </h2>
          <p className="text-sm text-gray-600">Elo: 1444</p>
        </div>
      </div>
      <button
        onClick={() => clearUserData()}
        className="bg-gray-100 rounded-md p-2 text-gray-600 hover:text-black"
      >
        {/* TODO conditionally render the Logout button */}
        Logout
      </button>
      {/* Mobile menu button */}
      <button className="sm:hidden p-2">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
  );
}

export default Header;
