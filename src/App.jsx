import "./App.css";

import { useState, useEffect } from "react";

// --- Componente principal ---
export default function App() {
  const [songs, setSongs] = useState([]); // canciones buscadas
  const [favorites, setFavorites] = useState([]); // lista de favoritos
  const [search, setSearch] = useState(""); // búsqueda actual

  // 🔹 Estado de paginación
  const [page, setPage] = useState(1);
  const perPage = 12; // canciones por página
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedSongs = songs.slice(start, end);

  // 🔹 Estado de paginación favoritos
  const [favPage, setFavPage] = useState(1);
  const favPerPage = 6; // favoritos por página
  const favStart = (favPage - 1) * favPerPage;
  const favEnd = favStart + favPerPage;
  const favPaginated = favorites.slice(favStart, favEnd);

  // --- Cargar favoritos desde localStorage al montar ---
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // --- Guardar favoritos cada vez que cambian ---
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // --- Buscar canciones en iTunes ---
  async function fetchSongs(query) {
    if (!query.trim()) return;

    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        query
      )}&media=music&entity=song&limit=50`
    );
    const data = await res.json();

    const results = data.results.map((track) => ({
      id: track.trackId,
      title: track.trackName,
      author: track.artistName,
      style: track.primaryGenreName || "Unknown",
      cover: track.artworkUrl100,
      preview: track.previewUrl,
    }));

    setSongs(results);
    setPage(1); // resetear a página 1
  }

  // --- Añadir/Quitar favoritos ---
  function toggleFavorite(song) {
    const exists = favorites.find((f) => f.id === song.id);
    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== song.id));
    } else {
      setFavorites([...favorites, song]);
      setFavPage(1); // resetear a página 1 en favoritos
    }
  }

  return (
    <div className="app">
      {/* --- Barra de búsqueda --- */}
      <header>
        <h1>🎵 Music App</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar artistas o canciones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => fetchSongs(search)}>Buscar</button>
        </div>
      </header>

      <main>
        {/* --- Lista de canciones --- */}
        <section className="songs">
          <h2>Resultados</h2>
          <div className="grid">
            {paginatedSongs.length === 0 && <p>No hay resultados.</p>}
            {paginatedSongs.map((song) => (
              <div key={song.id} className="card">
                <img src={song.cover} alt={song.title} />
                <h3>{song.title}</h3>
                <p>{song.author}</p>
                <p className="style">{song.style}</p>
                {song.preview && (
                  <audio controls src={song.preview}>
                    Tu navegador no soporta audio.
                  </audio>
                )}
                <button onClick={() => toggleFavorite(song)}>
                  {favorites.find((f) => f.id === song.id)
                    ? "⭐ Quitar"
                    : "☆ Fav"}
                </button>
              </div>
            ))}
          </div>

          {/* --- Paginación canciones --- */}
          {songs.length > perPage && (
            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                ⬅️ Anterior
              </button>
              <span>
                Página {page} de {Math.ceil(songs.length / perPage)}
              </span>
              <button
                disabled={page === Math.ceil(songs.length / perPage)}
                onClick={() => setPage(page + 1)}
              >
                Siguiente ➡️
              </button>
            </div>
          )}
        </section>

        {/* --- Favoritos --- */}
        <aside className="favorites">
          <h2>⭐ Favoritos</h2>
          {favorites.length === 0 && <p>No tienes favoritos aún.</p>}
          <div className="grid">
            {favPaginated.map((song) => (
              <div key={song.id} className="card">
                <img src={song.cover} alt={song.title} />
                <h3>{song.title}</h3>
                <p>{song.author}</p>
                {song.preview && <audio controls src={song.preview}></audio>}
                <button onClick={() => toggleFavorite(song)}>
                  ❌ Eliminar
                </button>
              </div>
            ))}
          </div>

          {/* --- Paginación favoritos --- */}
          {favorites.length > favPerPage && (
            <div className="pagination">
              <button
                disabled={favPage === 1}
                onClick={() => setFavPage(favPage - 1)}
              >
                ⬅️ Anterior
              </button>
              <span>
                Página {favPage} de {Math.ceil(favorites.length / favPerPage)}
              </span>
              <button
                disabled={favPage === Math.ceil(favorites.length / favPerPage)}
                onClick={() => setFavPage(favPage + 1)}
              >
                Siguiente ➡️
              </button>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
