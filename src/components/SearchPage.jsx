import { useState } from 'react';

const AnimeSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
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
      handleSearch();
    }
  };

  return (
    <div>
      <h2>Anime Search</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleKeyPress on key press
          placeholder="Search for anime..."
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((anime) => (
              <li key={anime.mal_id}>
                <h3>{anime.title}</h3>
                <img src={anime.images?.jpg?.image_url} alt={anime.title} />
                {/* Render additional anime details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default AnimeSearchPage;
