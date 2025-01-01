export interface ChessGame {
  moves: string;
}

export interface Lesson {
  day: string;
  icon: string;
  theme: string;
  improvement: string;
  isPremium: boolean;
}

export interface Puzzle {
  name: string;
  difficulty: string;
  fen: string;
  correctMoves: string[];
  theme: string;
}
