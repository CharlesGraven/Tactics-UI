import "../App.css";
import ChessCard from "./ChessCard.tsx";
import createCardFromGameString from "../utils/gameLoader.tsx";
import { useUser } from "../contexts/UserContext.tsx";

function CardList() {
  const { userData } = useUser();

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 justify-center">
        {userData.games.map((game: string) => (
          <ChessCard
            title="rand"
            fen={createCardFromGameString(game)}
            correctMove="e4"
          />
        ))}
      </div>
    </div>
  );
}

export default CardList;
