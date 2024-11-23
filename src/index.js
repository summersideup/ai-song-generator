function generatePlaylist(event) {
  event.preventDefault();

  let mood = document.querySelector("#moodInput").value;
  let genre = document.querySelector("#genreSelect").value;
  let artist = document.querySelector("#artistInput").value;

  let loadingElement = document.querySelector("#loading");
  let playlistContainer = document.querySelector("#playlistContainer");
  loadingElement.style.display = "block";
  playlistContainer.innerHTML = "";

  setTimeout(() => {
    loadingElement.style.display = "none";

    let playlistMessage = `Creating a playlist inspired by ${
      mood || "your mood"
    }, ${genre || "any genre"}, and ${artist || "various artists"}...`;

    new Typewriter(playlistContainer, {
      strings: playlistMessage,
      autoStart: true,
      delay: 50,
      onComplete: () => {
        let playlist = [
          `1. Song inspired by ${mood || "your mood"}`,
          `2. Song inspired by ${genre || "any genre"}`,
          `3. Song inspired by ${artist || "various artists"}`,
        ];
        playlist.forEach((song) => {
          let songElement = document.createElement("p");
          songElement.textContent = song;
          playlistContainer.appendChild(songElement);
        });
      },
    });
  }, 2000);
}

let playlistFormElement = document.querySelector(".input-section");
playlistFormElement.addEventListener("submit", generatePlaylist);
