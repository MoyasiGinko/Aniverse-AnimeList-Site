import { useState } from 'react';
import { Link } from 'react-router-dom';

const AnimeSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]); // Clear search results if search query is empty
      return;
    }

    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
      searchQuery
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const animeData = data.data;

      setSearchResults(animeData);
    } catch (error) {
      console.error('An error occurred while fetching anime data:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    clearTimeout(typingTimeout); // Clear previous timeout

    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    // Set a timeout for API request after 500ms of inactivity
    const timeout = setTimeout(() => {
      handleSearch();
    }, 500);

    setTypingTimeout(timeout);
  };

  return (
    <div className="anime-search-page">
      <h2>Anime Search</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for anime..."
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="search-results">
        {searchQuery.trim() !== '' && searchResults.length > 0 ? (
          <ul className="anime-list">
            {searchResults.map((anime) => (
              <li key={anime.mal_id}>
                <img src={anime.images?.jpg?.image_url} alt={anime.title} />
                <h3 key={anime.mal_id}>
                  <Link to={`/anime/${anime.mal_id}`}>{anime.title}</Link>
                </h3>
                {/* Render additional anime details as needed */}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default AnimeSearchPage;
