function Favorites({ favorites, setFavorites }) {
  const removeFavorite = (title) => {
    setFavorites(favorites.filter((f) => f.title !== title));
  };

  return (
    <aside className="favorites">
      <h2>⭐ Favoritos</h2>
      {favorites.length === 0 && <p>No tienes favoritos aún.</p>}
      <ul>
        {favorites.map((s, i) => (
          <li key={i}>
            {s.title} — {s.author}
            <button onClick={() => removeFavorite(s.title)}>❌</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Favorites;
