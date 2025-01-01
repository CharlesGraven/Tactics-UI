import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchLastGamesForUser } from "../apis/lichess-api";

interface UserData {
  username: string;
  games: string[];
  isAuthenticated: boolean;
}

interface UserContextType {
  userData: UserData;
  updateUsername: (username: string) => void;
  updateGames: (games: string[]) => void;
  clearUserData: () => void;
  getGamesForUser: (gameCount: number, username: string) => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = localStorage.getItem("userData");
    return savedData
      ? JSON.parse(savedData)
      : {
          username: "",
          games: [],
          isAuthenticated: false,
        };
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const updateUsername = (username: string): void => {
    setUserData((prev) => ({
      ...prev,
      username,
      isAuthenticated: true,
    }));
  };

  const updateGames = (games: string[]): void => {
    setUserData((prev) => ({
      ...prev,
      games,
    }));
  };

  const clearUserData = (): void => {
    setUserData({
      username: "",
      games: [],
      isAuthenticated: false,
    });
    localStorage.removeItem("userData");
  };

  const getGamesForUser = async (
    gameCount: number,
    username: string,
  ): Promise<void> => {
    try {
      const games = await fetchLastGamesForUser(gameCount, username);
      updateGames(games);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const value: UserContextType = {
    userData,
    updateUsername,
    updateGames,
    clearUserData,
    getGamesForUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
