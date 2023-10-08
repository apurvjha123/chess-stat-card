import { useState } from "react";

const NOT_AVAILABLE_LABEL = "NOT AVAILABLE"

function Chess() {
  const [userName, setUserName] = useState("");
  const [playerDetails, setPlayerDetails] = useState();
  const [playerStats, setPlayerStats] = useState();

  const get_stats = async () => {
    try {
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
    }
  };

  return (
    <div className="center">
      <label>Name</label>
      <input
        type="text"
        name="name"
        id="username"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <button onClick={get_stats}>Get Stats</button>
      <br></br>
      {playerDetails && playerStats ? (
        <>
          <img src={playerDetails.avatar}></img>
          <p id="avatar_name">Name : {playerDetails.name}</p>
          <p id="avatar_username">Username : {playerDetails.username}</p>
          <p id="avatar_location">Location : {playerDetails.location}</p>
          <p id="avatar_league">League: {playerDetails.league}</p>
          <p id="avatar_rapid">
            Best score in Rapid : {playerStats.hasOwnProperty("chess_rapid")? playerStats.chess_rapid.best.rating : NOT_AVAILABLE_LABEL }
          </p>
          <p id="avatar_blitz">
            Best score in Blitz : {playerStats.hasOwnProperty("chess_blitz")? playerStats.chess_blitz.best.rating : NOT_AVAILABLE_LABEL }
          </p>
          <p id="avatar_bullet">
            Best score in Bullet : {playerStats.hasOwnProperty("chess_bullet")? playerStats.chess_bullet.best.rating: NOT_AVAILABLE_LABEL}
          </p>
          <p id="avatar_daily">
            Best score in Daily: { playerStats.hasOwnProperty("chess_daily") ? playerStats.chess_daily.best.rating: NOT_AVAILABLE_LABEL}
          </p>
        </>
      ) : null}
    </div>
  );
}

export default Chess;
