import { Chess } from "chess.js";

export default function createCardFromGameString(pgn: string) {
  const chessGame = new Chess();
  const moves = pgn.split(" ");
  for (let i = 0; i < moves.length / 2; i++) {
    chessGame.move(moves[i]);
  }
  // Now we'll be in the halfway point of the game, so we'll return the fen
  return chessGame.fen();
}
