

async function get_stats(){


    const inputfieldname = document.getElementById("username")
    const username = inputfieldname.value

    console.log(username)
    const player_details_url = `https://api.chess.com/pub/player/${username}`
    const player_details_response = await fetch(player_details_url)
  
    const player_details = await player_details_response.json(); 

    document.querySelector("#avatar_image").src = player_details.avatar
    document.querySelector("#avatar_name").innerHTML = player_details.name

  
  
    
  
    let dictionary = {
      photo : player_details.avatar,
      name : player_details.name,
      username: player_details.username,
      location: player_details.location,
      league : player_details.league
    }




    return dictionary
  
}
  
function Chess(){

    return (
        <div>
            <label>Name</label>
            <input type="text" name="name" id="username" onChange={get_stats}/>

            <img src="" id="avatar_image"></img>
            <p1 id="avatar_name"></p1>

        </div>
    )
}

export default Chess