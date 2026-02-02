// 1. Funktion för att hämta Pokémon
async function getPokemon() {
  try {
    // Försök hämta data från API:et
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    );

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
export default async function HomePage() {
  try {
    // Försök hämta Pokémon
    const pokemonList = await getPokemon();

    return (
      <main>
        <h1>Min Poké-Shop</h1>
        <p>Denna data hämtas direkt vid sidladdning.</p>
        <ul>
          {pokemonList.map((pokemon: { name: string }) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    // Om något går fel -> visa fallback-UI istället
    return (
      <main>
        <h1>Något gick fel</h1>
        <p>Vi kunde tyvärr inte ladda några Pokémon just nu.</p>
      </main>
    )
  }
}
