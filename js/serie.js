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

function fetchPopularSeries() {
  fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-series-popular");
      data.results.forEach((serie) => {
        const card = createCard(serie, "tv");
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao buscar séries populares:", error));
}

function fetchTopRatedSeries() {
  fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-series-top-rated");
      data.results.forEach((serie) => {
        const card = createCard(serie, "tv");
        container.appendChild(card);
      });
    })
    .catch((error) =>
      console.error("Erro ao buscar séries mais bem avaliadas:", error),
    );
}

function fetchOnTheAirSeries() {
  fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#container-series-on-the-air");
      data.results.forEach((serie) => {
        const card = createCard(serie, "tv");
        container.appendChild(card);
      });
    })
    .catch((error) =>
      console.error("Erro ao buscar séries em exibição:", error),
    );
}

function fetchAiringTodaySeries() {
  fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(
        "#container-series-airing-today",
      );
      data.results.forEach((serie) => {
        const card = createCard(serie, "tv");
        container.appendChild(card);
      });
    })
    .catch((error) =>
      console.error("Erro ao buscar séries exibidas hoje:", error),
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

fetchPopularSeries();
fetchTopRatedSeries();
fetchOnTheAirSeries();
fetchAiringTodaySeries();
