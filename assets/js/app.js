console.log("JS Loaded!!");
const apiKey = "your_api_key_here"; // Replace with your OMDb API key
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const searchInput = document.getElementById("searchInput");
const movieList = document.getElementById("movieList");
const movieDetails = document.getElementById("movieDetails");

async function fetchMovies(query) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
  const data = await res.json();
  movieList.innerHTML = "";
  if (data.Search) {
    data.Search.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}" alt="">
        <h3>${movie.Title} (${movie.Year})</h3>
      `;
      card.addEventListener("click", () => fetchMovieDetails(movie.imdbID));
      movieList.appendChild(card);
    });
  } else {
    movieList.innerHTML = "<p>No movies found!</p>";
  }
}

async function fetchMovieDetails(id) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`);
  const movie = await res.json();
  movieDetails.classList.remove("hidden");
  movieDetails.innerHTML = `
    <h2>${movie.Title} (${movie.Year})</h2>
    <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}" alt="">
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Actors:</strong> ${movie.Actors}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <p><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>
  `;
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchMovies(query);
});

randomBtn.addEventListener("click", () => {
  const randomWords = ["love", "war", "space", "batman", "dream", "magic"];
  const random = randomWords[Math.floor(Math.random() * randomWords.length)];
  fetchMovies(random);
});
