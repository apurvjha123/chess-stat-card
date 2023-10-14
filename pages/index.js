import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";


import { useState } from "react";

const NOT_AVAILABLE_LABEL = "Not Available"

function ChessStatWindow() {
  const [userName, setUserName] = useState("");
  const [playerDetails, setPlayerDetails] = useState();
  const [playerStats, setPlayerStats] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="window">

      <div className="content_container">

        <div className= "input_container"> 

          <label className="input_name_label">Name</label>
          <input className="input_name_textbox"
            type="text"
            name="name"
            id="username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <button className= "input_submit_button" onClick={get_stats}>Get Stats</button>
          <br></br>

        </div>

        <div>

        {playerDetails && playerStats ? (<img src={playerDetails.avatar}></img>) :null}
        
        </div>
        

        <div className="stat_card">

          {playerDetails && playerStats ? (
            <>
              
              <span id="avatar_name">Name : {playerDetails.name}</span>
              <span id="avatar_username">Username : {playerDetails.username}</span>
              <span id="avatar_location">Location : {playerDetails.location}</span>
              <span id="avatar_league">League: {playerDetails.league}</span>
              <span id="avatar_rapid">
                Best score in Rapid : {playerStats.hasOwnProperty("chess_rapid")? playerStats.chess_rapid.best.rating : NOT_AVAILABLE_LABEL }
              </span>
              <span id="avatar_blitz">
                Best score in Blitz : {playerStats.hasOwnProperty("chess_blitz")? playerStats.chess_blitz.best.rating : NOT_AVAILABLE_LABEL }
              </span>
              <span id="avatar_bullet">
                Best score in Bullet : {playerStats.hasOwnProperty("chess_bullet")? playerStats.chess_bullet.best.rating: NOT_AVAILABLE_LABEL}
              </span>
              <span id="avatar_daily">
                Best score in Daily: { playerStats.hasOwnProperty("chess_daily") ? playerStats.chess_daily.best.rating: NOT_AVAILABLE_LABEL}
              </span>
            </>
          ) : null}




        </div>
        
      </div>
      
    </div>
  );
}

export default ChessStatWindow;
