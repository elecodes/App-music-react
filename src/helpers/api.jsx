const ITUNES_BASE = "https://itunes.apple.com/search";

// 🔹 Buscar canciones de un solo artista
export async function fetchSongsByArtist(artist, limit = 20) {
  try {
    const url = `${ITUNES_BASE}?term=${encodeURIComponent(
      artist
    )}&media=music&entity=song&limit=${limit}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const data = await res.json();

    if (!data.results || data.results.length === 0) return [];

    return data.results.map((track) => ({
      title: track.trackName || "Título desconocido",
      author: track.artistName || artist,
      style: track.primaryGenreName || "unknown",
      preview: track.previewUrl || null,
      cover: track.artworkUrl100 || null,
    }));
  } catch (err) {
    console.error(`❌ Error al traer canciones de ${artist}:`, err.message);
    return [];
  }
}

// 🔹 Buscar canciones de varios artistas
export async function fetchSongsByArtists(artists, limit = 20) {
  let results = [];
  for (const artist of artists) {
    const songs = await fetchSongsByArtist(artist, limit);
    results = [...results, ...songs];
    await new Promise((resolve) => setTimeout(resolve, 300)); // evitar bloqueo
  }
  return results;
}
