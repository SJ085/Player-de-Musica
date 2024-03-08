document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audioPlayer");
    const playlistItems = document.querySelectorAll("#playlist ul li a");
  
    playlistItems.forEach(item => {
      item.addEventListener("click", function(e) {
        e.preventDefault();
        const audioSrc = this.getAttribute("data-src");
        audioPlayer.src = audioSrc;
        audioPlayer.play();
      });
    });
  });
  