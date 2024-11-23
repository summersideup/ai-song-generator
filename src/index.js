function generateSong(event) {
  event.preventDefault();

  let mood = document.getElementById("moodInput").value;
  let genre = document.getElementById("genreselect").value;
  let artist = document.getElementById("artistInput").value;

  let apiKey = "23a0fd23dfocba49tebfd4efa06352b1";

  let prompt = `What is a real, existing ${mood} song by ${artist}? Please provide just the song title and release year. For example: if looking for a happy Chris Brown song, you might suggest "Forever (2008)" or "Yeah 3x (2010)". Only suggest real songs that actually exist.`;

  let context = `You are a music expert with deep knowledge of popular music. Only recommend real, existing songs by the specified artist that match the requested mood.`;

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  document.getElementById("loading").style.display = "block";
  document.getElementById("songResult").style.display = "none";

  axios
    .get(apiUrl)
    .then((response) => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("songResult").style.display = "block";

      let song = response.data.answer || "No song found.";

      document.getElementById("songResult").innerHTML = `
        <div class="song-card">
          <h2>Recommended Song</h2>
          <div class="song-info">
            <p class="song-title">${song}</p>
            <p class="song-artist">by ${artist}</p>
            <p class="song-mood">Mood: ${mood}</p>
            <p class="song-genre">Genre: ${genre}</p>
            <p class="streaming-note">🎵 Available on Spotify, Apple Music, and other streaming platforms</p>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Error finding song:", error);
      document.getElementById("loading").style.display = "none";
      document.getElementById("songResult").style.display = "block";
      document.getElementById("songResult").innerHTML =
        "<p class='error'>Sorry, something went wrong. Please try again.</p>";
    });
}

let generateButton = document.querySelector("button");
generateButton.addEventListener("click", generateSong);
