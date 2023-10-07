async function get_stats(){

  try{
  const inputfieldname = document.getElementById("username")
  const username = inputfieldname.value

  const player_details_url = `https://api.chess.com/pub/player/${username}`
  const player_details_response = await fetch(player_details_url)

  const player_details = await player_details_response.json(); 


  document.querySelector("#avatar_image").src = player_details.avatar
  document.querySelector("#avatar_name").innerHTML = player_details.name


  const player_stats_url = `https://api.chess.com/pub/player/${username}/stats`
  const player_stats_response = await fetch(player_stats_url)

  const player_stats = await player_stats_response.json(); 

  const rapid_best_stats = player_stats.chess_rapid.best
  const blitz_best_stats = player_stats.chess_blitz.best
  const bullet_best_stats = player_stats.chess_bullet.best
  const daily_best_stats = player_stats.chess_daily.best


  let dictionary = {
    photo : player_details.avatar,
    name : player_details.name,
    username: player_details.username,
    location: player_details.location,
    league : player_details.league,
    rapid_best : rapid_best_stats["rating"],
    blitz_best : blitz_best_stats["rating"],
    bullet_best: bullet_best_stats["rating"],
    daily_best:daily_best_stats["rating"]
  }

  document.querySelector("#avatar_image").src = dictionary.photo
  document.querySelector("#avatar_name").innerHTML = "Name :" + dictionary.name
  document.querySelector("#avatar_username").innerHTML = "Username :" +dictionary.username
  document.querySelector("#avatar_league").innerHTML = "League :" + dictionary.league
  document.querySelector("#avatar_rapid").innerHTML = "Best score in Rapid :"  + dictionary.rapid_best
  document.querySelector("#avatar_bullet").innerHTML = "Best score in Bullet :" +dictionary.bullet_best
  document.querySelector("#avatar_blitz").innerHTML = "Best score in Blitz :" + dictionary.blitz_best
  document.querySelector("#avatar_daily").innerHTML = "Best score in Daily :" + dictionary.daily_best
  document.querySelector("#avatar_location").innerHTML = "Location :" + dictionary.location


  console.log(dictionary)

  }catch{
    console.log("runtime error")
  }

}

function Chess(){

  return (
      <div>
          <label>Name</label>
          <input type="text" name="name" id="username" onChange={get_stats}/> <br></br>

          <img src="" id="avatar_image"></img>  <br></br>
          <p1 id="avatar_name"></p1> <br></br>
          <p1 id="avatar_username"></p1> <br></br>
          <p1 id="avatar_location"></p1> <br></br>
          <p1 id="avatar_league"></p1> <br></br>
          <p1 id="avatar_rapid"></p1> <br></br>
          <p1 id="avatar_blitz"></p1> <br></br>
          <p1 id="avatar_bullet"></p1> <br></br>
          <p1 id="avatar_daily"></p1> <br></br>


          

      </div>
  )
}

export default Chess