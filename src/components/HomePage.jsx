import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [upcomingAnime, setUpcomingAnime] = useState([]);

  useEffect(() => {
    const fetchUpcomingAnime = async () => {
      try {
        const response = await fetch(
          'https://api.jikan.moe/v4/seasons/upcoming',
        );
        const data = await response.json();
        const upcomingAnimeData = data.data;
        setUpcomingAnime(upcomingAnimeData);
      } catch (error) {
        console.error(
          'An error occurred while fetching upcoming anime:',
          error,
        );
      }
    };

    fetchUpcomingAnime();
  }, []);

  return (
    <div id="home">
      <ul className="cards">
        <li>
          <Link to="/genres">Genres</Link>
        </li>
        <li>
          <Link to="/animes">Animes</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
      </ul>
      <div className="upcoming-anime">
        <h2>Upcoming Anime</h2>
        {upcomingAnime.length > 0 ? (
          <ul>
            {upcomingAnime.map((anime) => (
              <li key={anime.mal_id}>
                <Link to={`/anime/${anime.mal_id}`}>
                  <img src={anime.images?.jpg?.image_url} alt={anime.title} />
                  <h3>{anime.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming anime found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
