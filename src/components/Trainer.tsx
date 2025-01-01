import Chessboard from "chessboardjsx";
import { useEffect, useState } from "react";
import { getRandomPuzzlesByTheme } from "../apis/backend-api.tsx";
import { Puzzle } from "../types.tsx";
import { Chess } from "chess.js";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

interface ThemeSelectorProps {
  themes: string[];
  chosenThemes: string[];
  clickThemeCallback: (theme: string) => void;
}

function ThemeSelector({
  themes,
  chosenThemes,
  clickThemeCallback,
}: ThemeSelectorProps) {
  return (
    <div className="w-full sm:w-64 shrink-0">
      <h2 className="text-lg font-semibold mb-2">Puzzle Themes</h2>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme, index) => (
          <button
            key={index}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
            onClick={() => clickThemeCallback(theme)}
          >
            {theme}
          </button>
        ))}
      </div>
      <h3 className="text-gray-600 mt-3">Themes in the mix</h3>
      <div className="flex flex-wrap gap-2">
        {chosenThemes.map((theme, index) => (
          <div
            key={index}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
          >
            {theme}
          </div>
        ))}
      </div>
    </div>
  );
}

// PuzzleTrainer Component with fixes
interface PuzzleTrainerProps {
  puzzle: Puzzle;
  onPuzzleComplete?: () => void;
}

type MoveStatus = "new_puzzle" | "wrong_move" | "correct_move" | "thinking";

function PuzzleTrainer({ puzzle, onPuzzleComplete }: PuzzleTrainerProps) {
  const [chessGame, setChessGame] = useState<Chess | null>(null);
  const [currMove, setCurrMove] = useState<number>(0);
  const [moveStatus, setMoveStatus] = useState<MoveStatus>("new_puzzle");

  const getMoveStatus = (): object => {
    switch (moveStatus) {
      case "new_puzzle":
        return (
          <div className="flex flex-row gap-2 align-items-top justify-center">
            <FaMagnifyingGlass />
            <div>Find the best move.</div>
          </div>
        );
      case "wrong_move":
        return (
          <div className="flex flex-row gap-2 align-items-top justify-center">
            <FaXmark />
            <div>Wrong move, try again.</div>
          </div>
        );
      case "correct_move":
        return (
          <div className="flex flex-row gap-2 align-items-top justify-center">
            <FaCheckCircle />
            <div>Correct Move, find the next one.</div>
          </div>
        );
      default:
        return <>Find the best move.</>;
    }
  };

  useEffect(() => {
    // Only initialize the game if we have a valid FEN
    if (puzzle.fen) {
      try {
        const game = new Chess(puzzle.fen);
        game.move(puzzle.correctMoves[currMove]);
        setChessGame(game);
        setCurrMove(1);
      } catch (error) {
        console.error("Error initializing chess game:", error);
      }
    }
  }, [puzzle]);

  const makeMove = (game: Chess, moveString: string): Chess | null => {
    try {
      const newGame = new Chess(game.fen());
      const move = newGame.move(moveString);
      if (move) {
        return newGame;
      }
    } catch (error) {
      console.error("Invalid move:", error);
    }
    return null;
  };

  const onPieceDrop = (obj: {
    sourceSquare: string;
    targetSquare: string;
    piece: string;
  }) => {
    if (!chessGame) return;

    const playerMove = obj.sourceSquare + obj.targetSquare;
    const expectedMove = puzzle.correctMoves[currMove];

    // Try to make the player's move
    const newGameAfterPlayerMove = makeMove(chessGame, playerMove);

    if (!newGameAfterPlayerMove || playerMove !== expectedMove) {
      setMoveStatus("wrong_move");
      return;
    }

    setMoveStatus("correct_move");
    setChessGame(newGameAfterPlayerMove);

    setTimeout(() => {
      const opponentMove = puzzle.correctMoves[currMove + 1];
      if (!opponentMove) {
        setCurrMove(0);
        setMoveStatus("new_puzzle");
        onPuzzleComplete?.();
        return;
      }

      const newGameAfterOpponentMove = makeMove(
        newGameAfterPlayerMove,
        opponentMove,
      );

      if (newGameAfterOpponentMove) {
        setChessGame(newGameAfterOpponentMove);
        setCurrMove(currMove + 2); // Increment by 2 to account for both moves
      }
    }, 300);
  };

  // Show loading state or empty board if no valid game
  if (!chessGame) {
    return (
      <div className="w-auto shrink-0">
        <Chessboard
          position="start"
          draggable={false}
          boardStyle={{
            borderRadius: "4px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-auto shrink-0">
      <div className="flex items-center justify-center">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <div>{getMoveStatus()}</div>
      </div>
      <Chessboard
        onDrop={onPieceDrop}
        draggable
        position={chessGame.fen()}
        boardStyle={{
          borderRadius: "4px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
        squareStyles={{
          h1: { backgroundColor: "gray" },
        }}
      />
      <div className="flex flex-row justify-between gap-5">
        <button>{"<<"} Previous Puzzle</button>
        <button>Hint?</button>
        <button>Next Puzzle {">>"}</button>
      </div>
    </div>
  );
}

// Main Trainer Container with fixes
function Trainer() {
  const [chosenThemes, setChosenThemes] = useState(["fork", "pin"]);
  const [puzzleList, setPuzzleList] = useState<Puzzle[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const THEMES = [
    "fork",
    "pin",
    "endgame",
    "short",
    "skewer",
    "advantage",
    "pawnEndgame",
    "middlegame",
    "mateIn1",
  ];

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const data = await getRandomPuzzlesByTheme("middlegame");
        const parsedPuzzles = data.map((puzzle: Puzzle) => ({
          name: puzzle["name"],
          difficulty: puzzle["difficulty"],
          fen: puzzle["fen"],
          correctMoves: puzzle["correctMoves"],
          theme: puzzle["theme"],
        }));

        setPuzzleList(parsedPuzzles);

        if (parsedPuzzles.length > 0) {
          setCurrentPuzzle(parsedPuzzles[0]);
        }
      } catch (err) {
        console.error("Error fetching puzzles:", err);
      }
    };
    fetchPuzzles();
  }, []);

  const handlePuzzleComplete = () => {
    setCurrentPuzzle(puzzleList[currentIdx + 1]);
    setCurrentIdx(currentIdx + 1);
  };

  const clickThemeCallback = (theme: string) => {
    setChosenThemes(chosenThemes.concat([theme]));
    console.log(theme);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4">
      <ThemeSelector
        themes={THEMES}
        chosenThemes={chosenThemes}
        clickThemeCallback={clickThemeCallback}
      />
      {currentPuzzle && (
        <PuzzleTrainer
          puzzle={currentPuzzle}
          onPuzzleComplete={handlePuzzleComplete}
        />
      )}
    </div>
  );
}

export default Trainer;
