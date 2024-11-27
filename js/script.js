import { API_KEY } from './info.js';

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const moviesGrid = document.getElementById("movies-grid");
const title = document.getElementById("title");

// Event listeners for navigation
document.getElementById("now-playing").addEventListener("click", () => loadMovies("now_playing", "Now Playing"));
document.getElementById("popular").addEventListener("click", () => loadMovies("popular", "Popular"));
document.getElementById("top-rated").addEventListener("click", () => loadMovies("top_rated", "Top Rated"));
document.getElementById("upcoming").addEventListener("click", () => loadMovies("upcoming", "Upcoming"));

// Load movies based on type
async function loadMovies(type, categoryTitle) {
  title.textContent = categoryTitle;
  const response = await fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}`);
  const data = await response.json();
  displayMovies(data.results);
}

// Display movies in the grid
function displayMovies(movies) {
  moviesGrid.innerHTML = ""; // Clear previous content
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
    `;

    moviesGrid.appendChild(movieCard);
  });
}

// Load "Now Playing" movies on initial load
loadMovies("now_playing", "Now Playing");
