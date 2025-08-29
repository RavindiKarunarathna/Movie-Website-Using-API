console.log("JS Loaded!!");

AOS.init();

let apiKey = "28017a56";

function callApi() {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${document.getElementById("searchInput").value}`)

        .then(responce => responce.json())
        .then(data => {
            console.log(data);
            setDetails(data);
        });
}

function setDetails(data) {
    document.getElementById("film-name").innerText = data.Title;
    document.getElementById("main-icon").src = data.Poster;
    document.getElementById("year").innerText = data.Year;
    document.getElementById("genre").innerText = data.Genre;
    document.getElementById("director").innerText = data.Director;
    document.getElementById("actors").innerText = data.Actors;
    document.getElementById("plot").innerText = data.Plot;
    document.getElementById("imdb_rate").innerText = data.imdbRating;
}

callApi();

// Movie list to pick random films
const movieList = [
    "Inception", "Interstellar", "The Dark Knight", "Fight Club", "Pulp Fiction",
    "Forrest Gump", "The Matrix", "Titanic", "The Godfather", "Avengers Endgame",
    "Joker", "Spider-Man", "Iron Man", "Shutter Island", "Gladiator",
    "Avatar", "Black Panther", "Doctor Strange", "Deadpool", "The Lion King",
    "Bigil", "The Shawshank Redemption", "Sinhaya", "Baahubali: The Beginning", "Baahubali 2: The Conclusion",
    "Enthiran", "2.0", "Kabali", "Kaala", "Vikram",
    "Master", "Leo", "Beast", "Jailer", "Mersal",
    "Bigil", "Thuppakki", "Sarkar", "Indian", "Anniyan",
    "Sivaji", "Ponniyin Selvan: Part One", "Ponniyin Selvan: Part Two", "The Greatest of All Time", "Mudhalvan",
    "Raatchasan", "Kadaikutty Singam"
];

function getRandomMovies(list, count) {
    let shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayRandomMovies() {
    const randomMovies = getRandomMovies(movieList, 12);

    randomMovies.forEach((title, index) => {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === "True") {
                    document.getElementById(`random-film-name-${index + 1}`).innerText = data.Title || "-";
                    document.getElementById(`random-film-icon-${index + 1}`).src =(data.Poster && data.Poster !== "N/A") ? data.Poster : "assets/images/default.jpg";
                    document.getElementById(`random-film-year-${index + 1}`).innerText = data.Year || "-";

                    // const downloadBtn = document.getElementById(`download-btn-${index + 1}`);
                    // if (downloadBtn) {  
                    //     downloadBtn.onclick = () => downloadBtn(data.Title, data.Year, data.Poster);
                    // }
                }
            });
    });
}

// function downloadBtn(title, year, posterUrl) {
//     const link = document.createElement("a");
//     link.href = posterUrl && posterUrl !== "N/A" ? posterUrl : "assets/images/default.jpg";
//     link.download = `${title}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     alert(`${title} (${year}) Poster Downloaded!`);
// }



displayRandomMovies();
