function SongsList({ songs, favorites, setFavorites }) {
  const toggleFavorite = (song) => {
    if (
      favorites.find((f) => f.title === song.title && f.author === song.author)
    ) {
      setFavorites(favorites.filter((f) => f.title !== song.title));
    } else {
      setFavorites([...favorites, song]);
    }
  };

  return (
    <div className="songs-list">
      {songs.length === 0 && <p>No hay canciones cargadas.</p>}
      {songs.map((song, i) => (
        <div key={i} className="song-card">
          {song.cover && <img src={song.cover} alt={song.title} />}
          <p>
            <strong>{song.title}</strong> — {song.author} [{song.style}]
          </p>
          {song.preview && (
            <audio controls src={song.preview}>
              Tu navegador no soporta el reproductor de audio.
            </audio>
          )}
          <button onClick={() => toggleFavorite(song)}>⭐</button>
        </div>
      ))}
    </div>
  );
}

export default SongsList;
