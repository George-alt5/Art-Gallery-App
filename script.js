const API_URL = "http://localhost:3000/artworks";

const artList = document.getElementById("art-list");
const form = document.getElementById("art-form");

function displayArtwork(artwork) {
  const card = document.createElement("div");
  card.className = "art-card";
  card.innerHTML = `<h3>${artwork.title}</h3><p><strong>Artist:</strong> ${artwork.artist}</p>`;
  card.addEventListener("click", () => {
    alert(`${artwork.title}\nBy ${artwork.artist}\n\n${artwork.description}`);
  });
  artList.appendChild(card);
}

function loadArtworks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      artList.innerHTML = "";
      data.forEach(displayArtwork);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newArtwork = {
    title: form.title.value,
    artist: form.artist.value,
    description: form.description.value,
  };
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newArtwork)
  })
  .then(res => res.json())
  .then(() => {
    form.reset();
    loadArtworks();
  });
});

loadArtworks();
