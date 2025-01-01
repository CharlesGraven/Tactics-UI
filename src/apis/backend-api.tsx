const url = "http://localhost:4567";

export const getScheduledLessons = async () => {
  const response = await fetch(url + "/puzzle_training", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const getRandomPuzzlesByTheme = async (theme: string) => {
  const response = await fetch(url + `/puzzles/${theme}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
};
