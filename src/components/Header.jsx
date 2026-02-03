import logo from "../assets/logo.png";

/**
 * Header component containing logo, search bar, and theme toggle.
 * @param {Object} props
 * @param {string} props.search - Current search input value.
 * @param {Function} props.setSearch - State setter for search input.
 * @param {Function} props.handleKeyDown - Keyboard event handler for search input.
 * @param {Function} props.setShowSuggestions - State setter for suggestions dropdown visibility.
 * @param {boolean} props.showSuggestions - visibility of suggestion dropdown.
 * @param {Array<Object>} props.suggestions - List of autocomplete suggestions.
 * @param {number} props.focusedIndex - Index of currently highlighted suggestion.
 * @param {Function} props.setFocusedIndex - State setter for focused index.
 * @param {Function} props.selectSuggestion - Handler for clicking a suggestion.
 * @param {Function} props.fetchSongs - Function to execute search.
 * @param {Function} props.setSongs - State setter to clear songs (e.g. on clear search).
 * @param {boolean} props.darkMode - Current theme state.
 * @param {Function} props.setDarkMode - State setter for theme.
 */
export default function Header({ 
    search, 
    setSearch, 
    handleKeyDown, 
    setShowSuggestions, 
    showSuggestions, 
    suggestions, 
    focusedIndex, 
    setFocusedIndex, 
    selectSuggestion, 
    fetchSongs, 
    setSongs,
    darkMode, 
    setDarkMode 
}) {
  return (
      <header>
        <h1>
          <img src={logo} alt="MoodTunes Logo" className="app-logo" />
          MoodTunes
        </h1>

        {/* 🔹 BÚSQUEDA MANUAL */}
        <div className="search-bar">
          <div className="search-input-wrapper">
             {/* 🔹 Accessibility: Explicit Label (Visually Hidden) */}
            <label htmlFor="search-input" className="visually-hidden">Search artists or songs</label>
            <input
              id="search-input"
              type="text"
              placeholder="Search artists or songs..."
              aria-label="Search artists or songs"
              value={search}
              onChange={(e) => {
                  setSearch(e.target.value);
                  setFocusedIndex(-1); // Reset focus on type
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (search.trim().length > 1) setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} 
            />
            {search && (
              <button 
                className="btn-clear"
                onClick={() => { setSearch(""); setSongs([]); }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-dropdown" role="listbox">
                {suggestions.map((s, index) => (
                  <li 
                    key={s.id} 
                    role="option"
                    aria-selected={index === focusedIndex}
                    className={index === focusedIndex ? "focused" : ""}
                    onClick={() => selectSuggestion(s)}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    <div>
                      <strong>{s.title}</strong>
                      <span>{s.author}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* 🔹 Microcopy: Verbo + Sustantivo */}
          <button onClick={() => { fetchSongs(search); setShowSuggestions(false); }} aria-label="Discover Music">Discover</button>
        </div>
          <div className="theme-switch-container" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <label htmlFor="theme-toggle" className="visually-hidden">Toggle Dark Mode</label>
            <label className="theme-switch" aria-label="Toggle dark mode">
              <input 
                id="theme-toggle"
                type="checkbox" 
                checked={darkMode} 
                onChange={() => setDarkMode(!darkMode)} 
              />
              <span className="slider">
                <span className="icon-moon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </span>
                <span className="icon-sun">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                </span>
              </span>
            </label>
          </div>
      </header>
  );
}
