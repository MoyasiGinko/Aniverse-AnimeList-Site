import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenrePageData } from '../redux/features/Genres/genrePageSlice';

const GenrePage = () => {
  const { genreId } = useParams();
  const dispatch = useDispatch();
  const { genreData, animeData, isLoading } = useSelector(
    (state) => state.genrespage,
  );

  useEffect(() => {
    dispatch(fetchGenrePageData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const genre = genreData.find((genre) => genre.mal_id === Number(genreId));

  if (!genre) {
    return <div>Genre not found.</div>;
  }

  const genreAnimes = animeData.filter((anime) => anime.genres.some(
    (g) => g.mal_id === genre.mal_id,
  ));

  return (
    <div>
      <h1>
        {genre.name}
        Anime
      </h1>
      <ul>
        {genreAnimes.map((anime) => (
          <li key={anime.mal_id}>{anime.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenrePage;
