import { fetchSongsByArtists } from "../helpers/api";

function SearchBar({ setSongs }) {
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputValue = formData.get("artists");

    // dividir por coma → lista de artistas
    const artists = inputValue
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    console.log("🔍 Buscando canciones de:", artists);

    const allSongs = await fetchSongsByArtists(artists, 10); // 🔹 10 por artista
    console.log("✅ Canciones recibidas:", allSongs);

    setSongs(allSongs);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        name="artists"
        placeholder="Introduce artistas separados por coma..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
