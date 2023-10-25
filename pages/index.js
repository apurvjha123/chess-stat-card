import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const NOT_AVAILABLE_LABEL = "Not Available";

function ChessStatWindow() {
  const [userName, setUserName] = useState("");
  const [playerDetails, setPlayerDetails] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getThemeClasses = () => {
    return isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black";
  };

  const darkThemeClasses = getThemeClasses();

  const get_stats = async () => {
    try {
      setIsLoading(true);

      const player_details_url = `https://api.chess.com/pub/player/${userName}`;
      const player_details_response = await fetch(player_details_url);
      const player_details = await player_details_response.json();

      const player_stats_url = `https://api.chess.com/pub/player/${userName}/stats`;
      const player_stats_response = await fetch(player_stats_url);
      const player_stats = await player_stats_response.json();

      setPlayerDetails(player_details);
      setPlayerStats(player_stats);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkThemeClasses}`}>
      <div className="absolute top-4 right-4">
        <Toggle onClick={toggleTheme}>{isDarkMode ? "🔆" : "🌙"}</Toggle>
      </div>
      <div className="flex justify-center items-center">
        <div className={`rounded-lg shadow-2xl p-4 w-full max-w-md ${darkThemeClasses}`}>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Username</label>
            <div className="flex">
              <Input
                className={`w-3/4 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${darkThemeClasses}`}
                type="text"
                name="name"
                id="username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <Button
                className={`w-1/4 ml-1 text-sm ${
                  isDarkMode
                    ? "bg-white text-gray-600"
                    : "bg-gray-600 text-white"
                }`}
                onClick={get_stats}
              >
                Get Stats
              </Button>
            </div>
          </div>
          {isLoading ? (
            <>
              <Skeleton className="w-[100px] h-[20px] rounded-full mb-4" />
              {[...Array(7)].map((_, index) => (
                <Skeleton key={index} className="w-full h-4 rounded mb-2" />
              ))}
            </>
          ) : (
            <>
              {playerDetails && playerStats ? (
                <div className="mt-8">
                  <Avatar className="rounded-full w-40 h-40 mx-auto transition-transform transform hover:scale-105 hover:shadow-2xl">
                    <AvatarImage src={playerDetails.avatar} />
                    <AvatarFallback>N/A</AvatarFallback>
                  </Avatar>
                  <div className="text-center mt-4">
                    <span className="block font-semibold">
                      Name: {playerDetails.name}
                    </span>
                    <span className="block">
                      Username: {playerDetails.username}
                    </span>
                    <span className="block">
                      Location: {playerDetails.location}
                    </span>
                    <span className="block">
                      League: {playerDetails.league}
                    </span>
                    <span className="block">
                      Best score in Rapid:{" "}
                      {playerStats.hasOwnProperty("chess_rapid")
                        ? playerStats.chess_rapid.best.rating
                        : NOT_AVAILABLE_LABEL}
                    </span>
                    <span className="block">
                      Best score in Blitz:{" "}
                      {playerStats.hasOwnProperty("chess_blitz")
                        ? playerStats.chess_blitz.best.rating
                        : NOT_AVAILABLE_LABEL}
                    </span>
                    <span className="block">
                      Best score in Bullet:{" "}
                      {playerStats.hasOwnProperty("chess_bullet")
                        ? playerStats.chess_bullet.best.rating
                        : NOT_AVAILABLE_LABEL}
                    </span>
                    <span className="block">
                      Best score in Daily:{" "}
                      {playerStats.hasOwnProperty("chess_daily")
                        ? playerStats.chess_daily.best.rating
                        : NOT_AVAILABLE_LABEL}
                    </span>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChessStatWindow;
