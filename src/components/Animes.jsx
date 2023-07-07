import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAnimes,
  reserveAnime,
  cancelReservation,
  fetchNextPage,
  fetchPreviousPage,
  fetchFirstPage,
} from '../redux/features/Animes/animesSlice';

const Animes = () => {
  const dispatch = useDispatch();
  const { animes, currentPage, status, error } = useSelector(
    (state) => state.animes
  );

  useEffect(() => {
    dispatch(fetchAnimes(currentPage));
  }, [dispatch, currentPage]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  const handleReserveAnime = (animeId) => {
    dispatch(reserveAnime(animeId));
  };

  const handleCancelReservation = (animeId) => {
    dispatch(cancelReservation(animeId));
  };

  const getReservationStatus = (animeId) => {
    const reserved = localStorage.getItem(`reserved_${animeId}`);
    console.log(`reserved_${animeId}:`, reserved);
    return reserved === 'true';
  };

  const handleNextPage = () => {
    dispatch(fetchNextPage());
  };

  const handlePreviousPage = () => {
    dispatch(fetchPreviousPage());
  };

  const handleFirstPage = () => {
    dispatch(fetchFirstPage());
  };

  return (
    <div className="all-animes">
      {animes.map((anime) => (
        <div className="anime-card2" key={anime.mal_id}>
          <img
            className="animeImage"
            src={anime.images?.jpg?.image_url}
            alt={anime.title}
          />
          <div className="anime-title">
            <h2 key={anime.mal_id}>
              <Link to={`/anime/${anime.mal_id}`}>{anime.title}</Link>
            </h2>
          </div>
          <div className="anime-content">
            <div className="anime-description">
              <p>
                Episodes:
                {anime.episodes}
              </p>
            </div>
            {getReservationStatus(anime.mal_id) ? (
              <>
                <button
                  type="button"
                  className="anime-cancel-btn"
                  onClick={() => handleCancelReservation(anime.mal_id)}
                >
                  Remove from List
                </button>
                <span className="anime-reserved">Added successfully</span>
              </>
            ) : (
              <button
                type="button"
                className="anime-reserve-btn"
                data-testid="cancel-reservation-button"
                onClick={() => handleReserveAnime(anime.mal_id)}
              >
                Add to List
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="pagination-buttons">
        <button type="button" onClick={handleFirstPage}>
          Go to Page 1
        </button>
        <button
          type="button"
          className="prev-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button type="button" className="next-button" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Animes;
