const API_KEY = "459f0a0d8c73551cd0f8e567481d0dba";

const container = document.querySelector("#container-popular");

document.querySelectorAll(".container").forEach((container) => {
  container.addEventListener("wheel", (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      container.scrollBy({
        left: e.deltaY * 2, // multiplica pra rolar mais rápido
        behavior: "smooth",
      });
    }
  });
});

function createCard(item, tipo = "movie") {
  const imagem = "https://image.tmdb.org/t/p/w500" + item.poster_path;
  const titulo = item.title || item.name; // filmes usam "title", séries usam "name"
  const pagina = tipo === "tv" ? "pages/pageSerie.html" : "pages/pageMovie.html";

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
      const container = document.querySelector("#container-popular");

      data.results.forEach((movie) => {
        const card = createCard(movie);
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao buscar filmes populares:", error));
}

function fetchTrending() {
  fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-alta");

      data.results.forEach((item) => {
        // itens de "trending" podem ser filme ou série; item.media_type diz qual é
        const card = createCard(item, item.media_type);
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao buscar em alta:", error));
}

function fetchNowPlaying() {
  fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-Lançamentos");
      data.results.forEach((movie) => container.appendChild(createCard(movie)));
    })
    .catch((error) => console.error("Erro ao buscar lançamentos:", error));
}

function fetchUpcoming() {
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(
        "#container-Proximos-Lançamentos",
      );
      data.results.forEach((movie) => container.appendChild(createCard(movie)));
    })
    .catch((error) =>
      console.error("Erro ao buscar próximos lançamentos:", error),
    );
}

function fetchTopRated() {
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-Mais-Avaliados");
      data.results.forEach((movie) => container.appendChild(createCard(movie)));
    })
    .catch((error) => console.error("Erro ao buscar mais avaliados:", error));
}

function fetchPopularSeries() {
  fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-series-popular");
      data.results.forEach((serie) =>
        container.appendChild(createCard(serie, "tv")),
      );
    })
    .catch((error) => console.error("Erro ao buscar séries populares:", error));
}
fetchTrending();
fetchPopularMovies();
fetchNowPlaying();
fetchUpcoming();
fetchTopRated();
fetchPopularSeries();

const searchInput = document.querySelector("#searchInput");


searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        window.location.href = `./pages/pageSearch.html?query=${searchInput.value}`;
    }
});