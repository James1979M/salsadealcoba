// Variables globales
let canciones = [];
let currentSongIndex = 0;
let audio;

// Elementos del DOM
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const randomButton = document.getElementById("random"); // Botón aleatorio
const progressBar = document.getElementById("progress-bar");
const timeInfo = document.getElementById("time-info");
const currentSongText = document.getElementById("current-song");

// Función para cargar las canciones desde el archivo JSON
async function loadSongs() {
  try {
    const response = await fetch("js/datos.json");
    const data = await response.json();
    console.log("Canciones cargadas:", data); // Verificar si el JSON carga bien
    canciones = data.canciones;
    initializePlayer();
  } catch (error) {
    console.error("Error al cargar las canciones:", error);
  }
}

//Funciòn para que el titulo james Salsa cambie de color constantemente
const title = document.querySelector("h1");
const colors = ["orange", "white", "cyan"];

let colorIndex = 0;
function changeTitleColor() {
  title.style.color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;//Cambia al siguiente color
}
setInterval(changeTitleColor, 300);//Cambia cada segundo

// Función para inicializar el reproductor con la primera canción
function initializePlayer() {
  if (canciones.length === 0) return;

  currentSongIndex = 0;
  audio = new Audio(canciones[currentSongIndex].ruta);
  updateSongText();
  addAudioEventListeners();
}

// Función para actualizar el texto de la canción actual
function updateSongText() {
  currentSongText.textContent = `${canciones[currentSongIndex].nombre}`;
}

// Función para reproducir la canción
function playSong() {
  try {
    audio.play();
    playButton.textContent = "⏸️";
  } catch (error) {
    console.warn("Reproducción bloqueada por el navegador:", error);
  }
}

// Función para pausar la canción
function pauseSong() {
  audio.pause();
  playButton.textContent = "▶️";
}

// Función para cambiar de canción correctamente
function cambiarCancion() {
  audio.src = canciones[currentSongIndex].ruta;
  updateSongText();
  audio.load(); // Solución para que cargue bien en móviles
  playSong();
}

// Función para reproducir la siguiente canción
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % canciones.length;
  cambiarCancion();
}

// Función para reproducir la canción anterior
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + canciones.length) % canciones.length;
  cambiarCancion();
}

// Función para reproducir una canción aleatoria
function randomSong() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * canciones.length);
  } while (randomIndex === currentSongIndex);

  currentSongIndex = randomIndex;
  cambiarCancion();

  // Efecto visual en el botón aleatorio
  randomButton.classList.add("active");
  setTimeout(() => randomButton.classList.remove("active"), 500);
}

// Event Listener para el botón aleatorio
randomButton.addEventListener("click", randomSong);

// Función para actualizar la barra de progreso y el tiempo actual
function updateProgress() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  progressBar.value = (currentTime / duration) * 100 || 0;
  timeInfo.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
}

// Cambia la posición de la canción al mover la barra
progressBar.addEventListener("input", () => {
  const duration = audio.duration;
  audio.currentTime = (progressBar.value / 100) * duration;
});

// Agrega eventos al reproductor de audio
function addAudioEventListeners() {
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", nextSong);
  audio.addEventListener("loadedmetadata", updateProgress);
}

// Función para formatear el tiempo en mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Event listeners de los botones
playButton.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);

// Carga las canciones y configura el reproductor
loadSongs();
