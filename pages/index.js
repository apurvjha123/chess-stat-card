import { Button, Card, CardContent, CardMedia, TextField, Typography, Skeleton } from "@mui/material";
import { useState } from "react";

const NOT_AVAILABLE_LABEL = "NOT AVAILABLE";

function Chess() {
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
    <div className="center">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <label className="label">Name:</label>
        <TextField
          size="small"
          id="outlined-basic"
          type="text"
          name="name"
          label="username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Button
          size="small"
          variant="contained"
          onClick={get_stats}
          className="getStatsButton"
        >
          Get Stats
        </Button>
      </div>
      {isLoading ? (
        // Render Skeleton
        <Card className="card">
          <CardMedia
            component={Skeleton}
            animation="wave"
            variant="rect"
            className="cardMedia"
          />
          <CardContent>
            <Typography variant="h5" className="value">
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" className="value">
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" className="value">
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" className="value">
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" className="value">
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" className="value">
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" className="value">
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" className="value">
              <Skeleton animation="wave" />
            </Typography>
          </CardContent>
        </Card>
      ) : (
        playerDetails && playerStats ? (
          // Render player details
          <Card className="card">
            <CardMedia
              className={`cardMedia avatar`}
              component="img"
              image={playerDetails.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUYioY1mnJnusvBWO1-NRAFGYpLyqouORfkQ'}
              alt="Avatar"
            />
            <CardContent>
              <Typography variant="h5" className="value">Name : {playerDetails.name}</Typography>
              <Typography variant="h5" className="value">Username : {playerDetails.username}</Typography>
              <Typography variant="h5" className="value">Location : {playerDetails.location}</Typography>
              <Typography variant="h5" className="value">League : {playerDetails.league}</Typography>
              <Typography variant="h5" className="value">
                Best score in Rapid : {playerStats.hasOwnProperty("chess_rapid") ? playerStats.chess_rapid.best.rating : NOT_AVAILABLE_LABEL}
              </Typography>
              <Typography variant="h5" className="value">
                Best score in Blitz : {playerStats.hasOwnProperty("chess_blitz") ? playerStats.chess_blitz.best.rating : NOT_AVAILABLE_LABEL}
              </Typography>
              <Typography variant="h5" className="value">
                Best score in Bullet : {playerStats.hasOwnProperty("chess_bullet") ? playerStats.chess_bullet.best.rating : NOT_AVAILABLE_LABEL}
              </Typography>
              <Typography variant="h5" className="value">
                Best score in Daily : {playerStats.hasOwnProperty("chess_daily") ? playerStats.chess_daily.best.rating : NOT_AVAILABLE_LABEL}
              </Typography>
            </CardContent>
          </Card>
        ) : null
      )}
    </div>
  );
}

export default Chess;
