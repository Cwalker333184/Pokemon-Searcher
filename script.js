document.getElementById('searchBtn').addEventListener('click', fetchPokemon);

async function fetchPokemon() {
  const input = document.getElementById('searchInput').value.toLowerCase().trim();
  const cardContainer = document.getElementById('pokemonCard');
  const loader = document.getElementById('loader');
  const error = document.getElementById('error');
  const searchBtn = document.getElementById('searchBtn');

  // Clear previous results and messages
  cardContainer.innerHTML = '';
  error.classList.add('d-none');
  error.textContent = '';
  loader.classList.remove('d-none');
  searchBtn.disabled = true;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`);
    const data = response.data;

    const name = data.name.toUpperCase();
    const id = data.id;
    const height = data.height;
    const weight = data.weight;
    const image = data.sprites.other['official-artwork'].front_default;
    const types = data.types.map(t => t.type.name).join(', ');

    const cardHTML = `
      <div class="card shadow" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="${name}">
        <div class="card-body text-center">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">
            <strong>ID:</strong> ${id}<br>
            <strong>Height:</strong> ${height}<br>
            <strong>Weight:</strong> ${weight}<br>
            <strong>Types:</strong> ${types}
          </p>
        </div>
      </div>
    `;

    cardContainer.innerHTML = cardHTML;

  } catch (err) {
    error.textContent = 'Pokémon not found. Please check the name or ID and try again.';
    error.classList.remove('d-none');
  } finally {
    loader.classList.add('d-none');
    searchBtn.disabled = false;
  }
}