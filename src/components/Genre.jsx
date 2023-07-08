import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenreData } from '../redux/features/Genres/genreSlice';

const GenreList = () => {
  const dispatch = useDispatch();
  const genreData = useSelector((state) => state.genre);
  const isLoading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    const storedGenreData = JSON.parse(localStorage.getItem('genreData'));
    if (storedGenreData && storedGenreData.length > 0) {
      dispatch(fetchGenreData.fulfilled(storedGenreData));
    } else {
      dispatch(fetchGenreData());
    }
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  return (
    <div className="genre-list">
      <h1>Genre List</h1>
      <ul className="menu">
        {genreData.map((genre) => (
          <li key={genre.mal_id} className="menu-item">
            <Link to={`/genres/${genre.mal_id}`} className="menu-link">
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
