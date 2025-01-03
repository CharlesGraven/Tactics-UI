const url = import.meta.env.VITE_API_URL;

export const getScheduledLessons = async () => {
  const response = await fetch(url + "/api/puzzle_training", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const getRandomPuzzlesByTheme = async (theme: string) => {
  const response = await fetch(url + `/api/puzzles/${theme}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
};
