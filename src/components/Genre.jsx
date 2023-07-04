import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenreData } from '../redux/features/Genres/genreSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const genreData = useSelector((state) => state.genre);
  const isLoading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchGenreData());
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
    <div>
      <h1>Genre List</h1>
      <ul>
        {genreData.map((genre) => (
          <li key={genre.mal_id}>
            <Link to={`/genres/${genre.mal_id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
