import { ChessGame } from "../types.tsx";

const url = "https://lichess.org/";
export const fetchLastGamesForUser = async (
  gamesback: number,
  username: string,
) => {
  const games = await fetch(
    url + "api/games/user/" + username + "?max=" + gamesback,
    {
      method: "GET",
      headers: {
        Accept: "application/x-ndjson",
      },
    },
  );

  const data = await games.text();

  const loadedGames: ChessGame[] = data
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  const allGames: string[] = loadedGames.map((game: ChessGame) => {
    return game.moves;
  });

  return allGames;
};
