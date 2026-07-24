const API_KEY = "459f0a0d8c73551cd0f8e567481d0dba";

const params = new URLSearchParams(window.location.search);

const query = params.get("query");

const selectGenero = document.querySelector("#genero");

function createCard(item, tipo = "movie") {
  const imagem = "https://image.tmdb.org/t/p/w500" + item.poster_path;
  const titulo = item.title || item.name; // filmes usam "title", séries usam "name"
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

function filterByGenre(generoId) {
  if (generoId === "") return;

  const buscaFilmes = fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${generoId}&language=pt-BR`,
  ).then((response) => response.json());

  const buscaSeries = fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${generoId}&language=pt-BR`,
  ).then((response) => response.json());

  Promise.all([buscaFilmes, buscaSeries])
    .then(([dataFilmes, dataSeries]) => {
      const container = document.querySelector("#container-search");
      container.innerHTML = "";

      if (dataFilmes.results.length === 0 && dataSeries.results.length === 0) {
        container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
      }

      dataFilmes.results.forEach((movie) => {
        const card = createCard(movie);
        container.appendChild(card);
      });

      dataSeries.results.forEach((serie) => {
        const card = createCard(serie, "tv");
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao buscar por gênero:", error));
}

selectGenero.addEventListener("change", () => {
  const genero = selectGenero.value;
  filterByGenre(genero);
});

selectGenero.addEventListener("change", () => {
  const genero = selectGenero.value;

  if (genero === "") return;
    filterByGenre(genero);
});

const searchInput = document.querySelector("#searchInput");

function searchAll(query) {
  if (query.trim() === "") return;

  const buscaFilmes = fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`,
  ).then((response) => response.json());

  const buscaSeries = fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`,
  ).then((response) => response.json());

  Promise.all([buscaFilmes, buscaSeries])
    .then(([dataFilmes, dataSeries]) => {
      const container = document.querySelector("#container-search");
      container.innerHTML = ""; // limpa só uma vez, depois que os dois terminaram

      if (dataFilmes.results.length === 0 && dataSeries.results.length === 0) {
        container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
      }

      dataFilmes.results.forEach((movie) => {
        const card = createCard(movie);
        container.appendChild(card);
      });

      dataSeries.results.forEach((serie) => {
        const card = createCard(serie, "tv");
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao buscar:", error));
}

if (query) {
  searchInput.value = query;
  searchAll(query);
}

searchInput.addEventListener("input", () => {
  searchAll(searchInput.value);
});
