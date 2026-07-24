const API_KEY = "459f0a0d8c73551cd0f8e567481d0dba";

function createCard(item, tipo = "movie") {
  const imagem = "https://image.tmdb.org/t/p/w500" + item.poster_path;
  const titulo = item.title || item.name;
  const pagina = tipo === "tv" ? "pageSerie.html" : "pageMovie.html";

  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = imagem;
  img.alt = titulo;

  card.appendChild(img);

  card.addEventListener("click", () => {
    window.location.href = `${pagina}?id=${item.id}`;
  });

  return card;
}

function fetchPopularMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-movies-popular");
      data.results.forEach((movie) => {
        const card = createCard(movie);
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao buscar filmes populares:", error));
}

function fetchTopRatedMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-movies-top-rated");
      data.results.forEach((movie) => {
        const card = createCard(movie);
        container.appendChild(card);
      });
    })
    .catch((error) =>
      console.error("Erro ao buscar filmes mais bem avaliados:", error),
    );
}

function fetchNowPlayingMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-movies-now-playing");
      data.results.forEach((movie) => {
        const card = createCard(movie);
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao buscar filmes em cartaz:", error));
}

function fetchUpcomingMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-movies-upcoming");
      data.results.forEach((movie) => {
        const card = createCard(movie);
        container.appendChild(card);
      });
    })
    .catch((error) =>
      console.error("Erro ao buscar próximos lançamentos:", error),
    );
}

document.querySelectorAll(".container").forEach((container) => {
  container.addEventListener("wheel", (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      container.scrollBy({
        left: e.deltaY * 2,
        behavior: "smooth",
      });
    }
  });
});

fetchPopularMovies();
fetchTopRatedMovies();
fetchNowPlayingMovies();
fetchUpcomingMovies();