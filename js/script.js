let currentPage = 1;
const charactersPerPage = 6;
const characterList = document.getElementById("character-list");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");
const currentPageSpan = document.getElementById("current-page");

document.addEventListener("DOMContentLoaded", function () {
  renderCharacterList(currentPage);
  updatePageNumber(currentPage);
  prevPageButton.addEventListener("click", () => changePage(-1));
  nextPageButton.addEventListener("click", () => changePage(1));
});

function changePage(step) {
  const newPage = currentPage + step;
  if (newPage >= 1 && newPage <= 34) {
    currentPage = newPage;
    renderCharacterList(currentPage);
    updatePageNumber(currentPage);
  }
}

function renderCharacterList(page) {
  axios
    .get(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((response) => {
      const data = response.data;
      characterList.innerHTML = "";
      const characters = data.results.slice(0, charactersPerPage);
      characters.forEach((character) => {
        const statusDotClass =
          character.status === "Alive" ? "alive-dot" : "dead-dot";
        const characterCard = `
    <div class="col-4 center col-md-4"> 
        <div class="card" onclick="showCharacterDetails(${character.id})">
            <img src="${character.image}" class="card-img-top" alt="${character.name}">
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text">
                    <span class="status-dot ${statusDotClass}"></span>
                    Status: ${character.status}
                </p>
                <p class="card-text">Species: ${character.species}</p>
                <p class="card-text">Last Episode: <span id="episode-${character.id}">Loading...</span></p>
            </div>
        </div>
    </div>
    
`;

        characterList.innerHTML += characterCard;
        getLastEpisode(
          character.id,
          character.episode[character.episode.length - 1]
        );
      });
      prevPageButton.disabled = page === 1;
      nextPageButton.disabled = page === 34 || data.info.next === null;
    })
    .catch((error) => {
      console.error("Error fetching characters:", error);
    });
}

function getLastEpisode(characterId, episodeUrl) {
  axios
    .get(episodeUrl)
    .then((response) => {
      const episodeNumber = response.data.episode;
      const episodeName = response.data.name;
      const episodeSpan = document.getElementById(`episode-${characterId}`);
      episodeSpan.textContent = `${episodeNumber} - ${episodeName}`;
    })
    .catch((error) => {
      console.error("Error fetching episode:", error);
    });
}

function showCharacterDetails(id) {
  axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      const character = response.data;
      const characterInfo = document.getElementById("character-info");
      characterInfo.innerHTML = `
                        <img src="${character.image}" class="img-fluid" alt="${character.name}">
                        <h2>${character.name}</h2>
                        <p>Status: ${character.status}</p>
                        <p>Species: ${character.species}</p>
                        <p>Location: ${character.location.name}</p>
                    `;
      characterList.classList.add("d-none");
      document.getElementById("character-details").classList.remove("d-none");
    })
    .catch((error) => {
      console.error("Error fetching character details:", error);
    });
}

const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
  characterList.classList.remove("d-none");
  document.getElementById("character-details").classList.add("d-none");
});

function updatePageNumber(page) {
  currentPageSpan.textContent = `Página ${page}`;
}

function renderCharacterList(page) {
  axios
    .get(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((response) => {
      const data = response.data;
      const numCharacters = data.info.count;
      document.getElementById("num-characters").textContent = numCharacters;
      characterList.innerHTML = "";
      const characters = data.results.slice(0, charactersPerPage);
      characters.forEach((character) => {
        const statusDotClass =
          character.status === "Alive" ? "alive-dot" : "dead-dot";
        const characterCard = `
                            <div class="col-md-4">
                                <div class="card" onclick="showCharacterDetails(${character.id})">
                                    <img src="${character.image}" class="card-img-top" alt="${character.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${character.name}</h5>
                                        <p class="card-text">
                                            <span class="status-dot ${statusDotClass}"></span>
                                            Status: ${character.status}
                                        </p>
                                        <p class="card-text">Species: ${character.species}</p>
                                        <p class="card-text">Last Episode: <span id="episode-${character.id}">Loading...</span></p>
                                    </div>
                                </div>
                            </div>
                        `;
        characterList.innerHTML += characterCard;
        getLastEpisode(
          character.id,
          character.episode[character.episode.length - 1]
        );
      });
      prevPageButton.disabled = page === 1;
      nextPageButton.disabled = page === 34 || data.info.next === null;
    })
    .catch((error) => {
      console.error("Error fetching characters:", error);
    });
}
function renderCharacterList(page) {
  axios
    .get(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((response) => {
      const data = response.data;

      const numCharacters = data.info.count;
      document.getElementById("num-characters").textContent = numCharacters;

      axios.get("https://rickandmortyapi.com/api/location").then((response) => {
        const numLocations = response.data.info.count;
        document.getElementById("num-locations").textContent = numLocations;
      });

      axios.get("https://rickandmortyapi.com/api/episode").then((response) => {
        const numEpisodes = response.data.info.count;
        document.getElementById("num-episodes").textContent = numEpisodes;
      });

      characterList.innerHTML = "";
      const characters = data.results.slice(0, charactersPerPage);
      characters.forEach((character) => {
        const statusDotClass =
          character.status === "Alive" ? "alive-dot" : "dead-dot";
        const characterCard = `
                            <div class="col-md-4 ">
                                <div class="card" onclick="showCharacterDetails(${character.id})">
                                    <img src="${character.image}" class="card-img-top" alt="${character.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${character.name}</h5>
                                        <p class="card-text">
                                            <span class="status-dot ${statusDotClass}"></span>
                                            Status: ${character.status}
                                        </p>
                                        <p class="card-text">Species: ${character.species}</p>
                                        <p class="card-text">Last Episode: <span id="episode-${character.id}">Loading...</span></p>
                                    </div>
                                </div>
                            </div>
                        `;
        characterList.innerHTML += characterCard;
        getLastEpisode(
          character.id,
          character.episode[character.episode.length - 1]
        );
      });
      prevPageButton.disabled = page === 1;
      nextPageButton.disabled = page === 34 || data.info.next === null;
    })
    .catch((error) => {
      console.error("Error fetching characters:", error);
    });
}

