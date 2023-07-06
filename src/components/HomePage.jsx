import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [upcomingAnime, setUpcomingAnime] = useState([]);

  useEffect(() => {
    const fetchUpcomingAnime = async () => {
      try {
        const response = await fetch(
          'https://api.jikan.moe/v4/seasons/upcoming'
        );
        const data = await response.json();
        const upcomingAnimeData = data.data;
        setUpcomingAnime(upcomingAnimeData);
      } catch (error) {
        console.error(
          'An error occurred while fetching upcoming anime:',
          error
        );
      }
    };

    fetchUpcomingAnime();
  }, []);

  return (
    <div id="home">
      <ul className="cards">
        <li className="card">
          <Link to="/genres">
            <div className="card-content">
              <span>Genres</span>
            </div>
          </Link>
        </li>
        <li className="card">
          <Link to="/anime">
            <div className="card-content">
              <span>Animes</span>
            </div>
          </Link>
        </li>
        <li className="card">
          <Link to="/search">
            <div className="card-content">
              <span>Search</span>
            </div>
          </Link>
        </li>
        <li className="card">
          <Link to="/profile">
            <div className="card-content">
              <span>My Profile</span>
            </div>
          </Link>
        </li>
      </ul>
      <div className="upcoming-anime">
        <h2>Upcoming Anime</h2>
        {upcomingAnime.length > 0 ? (
          <ul className="anime-list">
            {upcomingAnime.map((anime) => (
              <li className="anime-card" key={anime.mal_id}>
                <Link to={`/anime/${anime.mal_id}`}>
                  <div className="anime-image">
                    <img src={anime.images?.jpg?.image_url} alt={anime.title} />
                  </div>
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
