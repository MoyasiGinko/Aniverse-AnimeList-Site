import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetails } from '../redux/features/Details/detailsSlice';

const AnimeDetailsPage = () => {
  const { animeId } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(fetchDetails(animeId));
  }, [dispatch, animeId]);

  if (isLoading) {
    return (
      <div className="anime-details-page">
        <div className="loading-message">Loading anime details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="anime-details-page">
        <div className="error-message">
          Error loading anime details:
          {' '}
          {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="anime-details-page">
        <div>No anime details available</div>
      </div>
    );
  }

  const {
    title,
    images,
    synopsis,
    episodes,
    aired,
    rating,
    score,
    popularity,
    genres,
    studios,
  } = data;

  return (
    <div className="anime-details-page">
      <h1>{title}</h1>
      <div className="anime-image">
        <img src={images?.jpg?.image_url} alt={title} />
      </div>
      <div className="details">
        <h2>Synopsis</h2>
        <p>{synopsis}</p>
        <div>
          <h2>Details</h2>
          <table>
            <tbody>
              <tr>
                <th>Episodes:</th>
                <td>{episodes}</td>
              </tr>
              <tr>
                <th>Aired:</th>
                <td>{aired.string}</td>
              </tr>
              <tr>
                <th>Rating:</th>
                <td>{rating}</td>
              </tr>
              <tr>
                <th>Score:</th>
                <td>{score}</td>
              </tr>
              <tr>
                <th>Popularity:</th>
                <td>{popularity}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>Genres</h2>
          <ul>
            {genres.map((genre) => (
              <li key={genre.mal_id}>{genre.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Studios</h2>
          <ul>
            {studios.map((studio) => (
              <li key={studio.mal_id}>{studio.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsPage;
