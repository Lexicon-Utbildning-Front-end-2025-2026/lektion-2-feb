// 1. Funktion för att hämta Pokémon
async function getPokemon() {
  try {
    // Försök hämta data från API:et
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");

    // Om svaret inte är OK (t.ex 404, 500)
    if (!response.ok) {
      console.log(response);
      throw new Error("Kunde inte hämta våra Pokémon");
    }
    // Gör om svaret till JSON
    const data = await response.json();

    return data.results;
  } catch (error) {
    // Fångar alla fel som sker ovan:
    // Nätverksfel
    // API-fel
    // JSON-fel
    console.error("Fel vid hämtning: ", error);

    // Skicka vidare felet (så komponenten kan hantera det)
  }
}


// 2. Komponenten