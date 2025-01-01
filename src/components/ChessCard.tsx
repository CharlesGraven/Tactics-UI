import Chessboard from "chessboardjsx";

interface ChessCardProps {
  title: string;
  description?: string;
  fen: string;
  correctMove: string;
  rating?: number;
  difficulty?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  link?: string;
}

// Color scheme configuration
const colorBold = "gray-800";
const colorPrimary = "gray-400";
const colorSecondary = "gray-200";
const colorBg = "gray-100";
const colorDark = "gray-900";
const colorMid = "gray-700";
const colorLight = "gray-50";

const ChessCard = ({
  title,
  description,
  fen,
  correctMove,
  rating,
  difficulty = 2,
}: ChessCardProps) => {
  const renderPawns = () => {
    return Array(7)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`${
            index < difficulty ? `text-${colorLight}` : `text-black`
          }`}
        >
          ♙
        </span>
      ));
  };

  return (
    <div
      className={`
      flex flex-col w-64 h-96 
      bg-gradient-to-b from-${colorBg} to-${colorSecondary} 
      rounded-lg shadow-lg border-2 border-${colorPrimary} 
      hover:shadow-2xl transition-all duration-300 overflow-hidden
    `}
    >
      {/* Title section */}
      <div className={`px-3 py-2 bg-${colorBold} text-${colorLight}`}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm truncate">{title}</h3>
          {rating && (
            <span
              className={`
              text-xs bg-${colorMid} px-2 py-1 rounded-full ml-2
            `}
            >
              ★{rating}
            </span>
          )}
        </div>
      </div>

      {/* Difficulty indicator */}
      <div
        className={`
        bg-${colorDark} px-3 py-1 text-xs 
        flex justify-between items-center
      `}
      >
        <span className={`text-${colorPrimary}`}>Difficulty:</span>
        <div className="flex space-x-1">{renderPawns()}</div>
      </div>

      {/* Chess board section */}
      <div
        className={`
        relative flex-grow flex items-center justify-center p-2 
        bg-gradient-to-b from-${colorLight} to-${colorBg}
      `}
      >
        <Chessboard
          width={240}
          position={fen}
          draggable
          boardStyle={{
            borderRadius: "4px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      {/* Description and move section */}
      <div className={`flex flex-col bg-${colorBold} text-${colorLight}`}>
        {/* Description */}
        <div className="p-3 flex-grow">
          <p className="text-xs text-left">
            {description || "Find the best move in this position"}
          </p>
        </div>

        {/* Correct move section */}
        <div
          className={`
          bg-${colorDark} px-3 py-0
          flex justify-between items-center text-xs 
          border-t border-${colorMid}
        `}
        >
          <span className={`text-${colorPrimary} font-medium`}>
            Correct Move:
          </span>
          <span
            className={`
            bg-${colorMid} px-2 py-0.5 rounded text-${colorLight}
          `}
          >
            {correctMove}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChessCard;
