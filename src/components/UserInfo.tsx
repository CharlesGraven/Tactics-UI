import { useState } from "react";
import "../App.css";
import { useUser } from "../contexts/UserContext.tsx";

function UserInfo() {
  const [username, setUsername] = useState("latenightlotion");
  const { userData, getGamesForUser, updateUsername } = useUser();

  const sendInfo = async () => {
    updateUsername(username);
    await getGamesForUser(5, username);
  };

  return (
    <div className={"flex flex-col"}>
      <div className="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Lichess Username
          </label>
          <input
            type="text"
            id="username"
            disabled={userData.games.length > 0}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="username"
          />
        </div>
        <div>
          {userData.games.length === 0 ? (
            <button
              onClick={() => {
                sendInfo();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Import your Games
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
