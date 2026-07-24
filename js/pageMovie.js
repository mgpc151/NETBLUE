const API_KEY = "459f0a0d8c73551cd0f8e567481d0dba";

const params = new URLSearchParams(window.location.search);

const movieId = params.get("id");

console.log(movieId);

const assistirButton = document.getElementById("assistir-button");

function fetchMovie() {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const imagem = "https://image.tmdb.org/t/p/w500" + data.poster_path;
      const movieTitle = document.querySelector("#movie-title");
      const moviePoster = document.querySelector("#movie-poster");
      const movieDescription = document.querySelector("#movie-description");
      const movieTrailer = document.querySelector("#movie-trailer");

      const trailer = data.videos.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );

      if (trailer && movieTrailer) {
        movieTrailer.src = `https://www.youtube.com/embed/${trailer.key}`;
      } else if (movieTrailer) {
        movieTrailer.style.display = "none";
      }

      if (assistirButton) {
        assistirButton.addEventListener("click", () => {
          if (trailer) {
            const embedUrl = `https://www.youtube.com/embed/${trailer.key}`;
            window.location.href = `../pages/assistir.html?link=${encodeURIComponent(embedUrl)}`;
          } else {
            alert("Trailer não disponível para esse filme.");
          }
        });
      }

      movieTitle.textContent = data.title;
      moviePoster.src = imagem;
      movieDescription.textContent = data.overview;
    })
    .catch((error) =>
      console.error("Erro ao buscar detalhes do filme:", error),
    );
}
fetchMovie();

//detalhes do filme
const card = document.querySelector("#movie-poster");

const descricao = document.getElementById("movie-description");

// Expande ao clicar no parágrafo
descricao.addEventListener("click", (event) => {
  event.stopPropagation(); // Impede que o clique chegue ao document
  descricao.classList.add("expandido");
  card.classList.add("open"); // Desativa o hover
});

// Fecha ao clicar em qualquer lugar da tela
document.addEventListener("click", () => {
  descricao.classList.remove("expandido");
  card.classList.remove("open"); // Ativa novamente
});
