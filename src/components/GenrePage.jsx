import React, { useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenrePageData } from '../redux/features/Genres/pageSlice';

const GenrePage = () => {
  const { genreId } = useParams();
  const dispatch = useDispatch();
  const { genreData, animeData, isLoading } = useSelector(
    (state) => state.genrespage
  );

  useEffect(() => {
    const fetchGenreData = async () => {
      if (animeData.length === 0 || genreData.length === 0) {
        // Fetch genre and anime data if they are not available in the Redux store
        await dispatch(fetchGenrePageData());
      }
    };

    fetchGenreData();
  }, [dispatch, animeData.length, genreData.length]);

  const filterGenreAnimes = useCallback(() => {
    const genre = genreData.find((genre) => genre.mal_id === Number(genreId));

    if (!genre || !animeData) {
      return [];
    }

    return animeData.filter((anime) =>
      anime.genres.some((g) => g.mal_id === Number(genreId))
    );
  }, [genreData, animeData, genreId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const genreAnimes = filterGenreAnimes();

  return (
    <div>
      <h1>
        {genreData.find((genre) => genre.mal_id === Number(genreId))?.name ||
          'Unknown'}
        Anime
      </h1>
      <ul className="card-list">
        {genreAnimes.map((anime) => (
          <li className="card" key={anime.mal_id}>
            <Link to={`/anime/${anime.mal_id}`} className="card-link">
              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                className="card-image"
              />
              <h3 className="card-title">{anime.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenrePage;
