import ToggleSwitch from "./ToggleSwitch.tsx";
import CardList from "./CardList.tsx";
import UserInfo from "./UserInfo.tsx";
import { useUser } from "../contexts/UserContext.tsx";
import { useState } from "react";
import Trainer from "./Trainer.tsx";

function MainContent() {
  const { userData } = useUser();
  const [currView, setCurrView] = useState("yourGames");

  const toggleSetting = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    currView === "yourGames"
      ? setCurrView("aiTrainer")
      : setCurrView("yourGames");
  };

  return (
    <>
      {userData.games.length > 0 ? (
        <>
          {" "}
          <ToggleSwitch onToggle={toggleSetting} />
          {currView === "yourGames" ? (
            <div>
              <CardList />
            </div>
          ) : (
            <Trainer />
          )}
        </>
      ) : (
        <UserInfo />
      )}
    </>
  );
}

export default MainContent;
