const songs = [
	{
	  title: "Ukulele",
	  artist: "Artist 1",
	  src: "music/ukulele.mp3",
	  cover: "images/ukulele.jpg",
	},
	{
	  title: "Hey",
	  artist: "Artist 2",
	  src: "music/hey.mp3",
	  cover: "images/hey.jpg",
	},
	{
	  title: "Summer",
	  artist: "Artist 3",
	  src: "music/summer.mp3",
	  cover: "images/summer.jpg",
	},
  ];
  
  const albumArt = document.getElementById("album-art");
  const songTitle = document.getElementById("song-title");
  const artist = document.getElementById("artist");
  const progress = document.getElementById("progress");
  const progressContainer = document.querySelector(".progress-container");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  
  let currentSongIndex = 0;
  let isPlaying = false;
  
  const audio = new Audio();
  
  // Load song
  function loadSong(song) {
	songTitle.textContent = song.title;
	artist.textContent = song.artist;
	albumArt.src = song.cover;
	audio.src = song.src;
  }
  
  // Play song
  function playSong() {
	isPlaying = true;
	audio.play();
	playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  
  // Pause song
  function pauseSong() {
	isPlaying = false;
	audio.pause();
	playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
  
  // Update progress bar
  function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
  }
  
  // Set progress
  function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;
  }
  
  // Next song
  function nextSong() {
	currentSongIndex = (currentSongIndex + 1) % songs.length;
	loadSong(songs[currentSongIndex]);
	if (isPlaying) playSong();
  }
  
  // Previous song
  function prevSong() {
	currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
	loadSong(songs[currentSongIndex]);
	if (isPlaying) playSong();
  }
  
  // Event listeners
  playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
  nextBtn.addEventListener("click", nextSong);
  prevBtn.addEventListener("click", prevSong);
  audio.addEventListener("timeupdate", updateProgress);
  progressContainer.addEventListener("click", setProgress);
  audio.addEventListener("ended", nextSong);
  
  // Load first song
  loadSong(songs[currentSongIndex]);