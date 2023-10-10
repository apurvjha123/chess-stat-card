import { Button, Card, CardContent, CardMedia, TextField, Typography, Skeleton } from "@mui/material";
import { useState } from "react";

const NOT_AVAILABLE_LABEL = "NOT AVAILABLE"

const styles = {
  card: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: 20,
    padding: 20,
    textAlign: "center",
    background: "linear-gradient(45deg, #0099f7, #f11712)",
    color: "#fff",
    borderRadius:"5%",
  },
  cardMedia: {
    width: 200,
    height: 200,
    margin: "0 auto",
    borderRadius: "50%",
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    color:"white",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  getStatsButton: {
    marginLeft: 10,
    backgroundColor:"#2d25fa",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px", 
  },
};

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
        <label style={styles.label}>Name :</label>
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
          style={styles.getStatsButton}
        >
          Get Stats
        </Button>
      </div>
      {isLoading ? (
        // Render Skeleton 
        <Card style={styles.card}>
          <CardMedia
            component={Skeleton}
            animation="wave"
            variant="rect"
            style={styles.cardMedia}
          />
          <CardContent>
            <Typography variant="h5" style={styles.value}>
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" style={styles.value}>
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" style={styles.value}>
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" style={styles.value}>
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" style={styles.value}>
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" style={styles.value}>
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" style={styles.value}>
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="h5" style={styles.value}>
              <Skeleton animation="wave" />
            </Typography>
          </CardContent>
        </Card>
      ) : (
        // render player details
        playerDetails && playerStats ? (
          <Card style={styles.card}>
            <CardMedia
              component="img"
              style={styles.cardMedia}
              image={playerDetails.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUYioY1mnJnusvBWO1-NRAFGYpLyqouORfkQ'}//if user doesn't have a pfp
              alt="Avatar"
            />
            <CardContent>
              <Typography variant="h5" style={styles.value}>Name: {playerDetails.name}</Typography>
              <Typography variant="h5" style={styles.value}>Username: {playerDetails.username}</Typography>
              <Typography variant="h5" style={styles.value}>Location: {playerDetails.location}</Typography>
              <Typography variant="h5" style={styles.value}>League: {playerDetails.league}</Typography>
              <Typography variant="h5" style={styles.value}>
                Best score in Rapid : {playerStats.hasOwnProperty("chess_rapid") ? playerStats.chess_rapid.best.rating : NOT_AVAILABLE_LABEL }
              </Typography>
              <Typography variant="h5" style={styles.value}>
                Best score in Blitz : {playerStats.hasOwnProperty("chess_blitz") ? playerStats.chess_blitz.best.rating : NOT_AVAILABLE_LABEL }
              </Typography>
              <Typography variant="h5" style={styles.value}>
                Best score in Bullet : {playerStats.hasOwnProperty("chess_bullet") ? playerStats.chess_bullet.best.rating : NOT_AVAILABLE_LABEL}
              </Typography>
              <Typography variant="h5" style={styles.value}>
                Best score in Daily: { playerStats.hasOwnProperty("chess_daily") ? playerStats.chess_daily.best.rating : NOT_AVAILABLE_LABEL}
              </Typography>
            </CardContent>
          </Card>
        ) : null
      )}
    </div>
  );
}

export default Chess;
