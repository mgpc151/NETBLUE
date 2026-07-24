const API_KEY = "459f0a0d8c73551cd0f8e567481d0dba";

const params = new URLSearchParams(window.location.search);
const serieId = params.get("id");
let serieTrailer;

const assistirButton = document.getElementById("assistir-button");

function fetchSerie() {
  fetch(
    `https://api.themoviedb.org/3/tv/${serieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`,
  )
    .then((response) => response.json())
    .then((data) => {
      const imagem = "https://image.tmdb.org/t/p/w500" + data.poster_path;
      const serieTitle = document.querySelector("#serie-title");
      const seriePoster = document.querySelector("#serie-poster");
      const serieDescription = document.querySelector("#serie-description");
      const trailer = data.videos.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );

      if (assistirButton) {
        assistirButton.addEventListener("click", () => {
          if (trailer) {
            const embedUrl = `https://www.youtube.com/embed/${trailer.key}`;
            window.location.href = `../pages/assistir.html?link=${encodeURIComponent(embedUrl)}`;
          } else {
            alert("Trailer não disponível para essa série.");
          }
        });
      }

      serieTitle.textContent = data.name;
      seriePoster.src = imagem;
      serieDescription.textContent = data.overview;
    })
    .catch((error) =>
      console.error("Erro ao buscar detalhes da série:", error),
    );
}
fetchSerie();

//detalhes da série
const card = document.querySelector("#serie-poster");
const descricao = document.getElementById("serie-description");

descricao.addEventListener("click", (event) => {
  event.stopPropagation();
  descricao.classList.add("expandido");
  card.classList.add("open");
});

document.addEventListener("click", () => {
  descricao.classList.remove("expandido");
  card.classList.remove("open");
});
