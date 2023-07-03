import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAnimes,
  reserveAnime,
  cancelReservation,
} from '../redux/features/Animes/animesSlice';

const Animes = () => {
  const dispatch = useDispatch();
  const { animes, status, error } = useSelector((state) => state.animes);

  useEffect(() => {
    dispatch(fetchAnimes());
  }, [dispatch]);

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
    return reserved === 'true';
  };

  return (
    <div className="all-animes">
      {animes.map((anime) => (
        <div className="anime" key={anime.id}>
          <img className="animeImage" src={anime.photo} alt={anime.name} />
          <div className="data">
            <div className="wrapper">
              <h2 className="name">{anime.name}</h2>
              {getReservationStatus(anime.id) ? (
                <span className="anime-reserved">Reserved</span>
              ) : (
                <></>
              )}
            </div>
            <div className="description">
              <p>{anime.description}</p>
              <p>
                ID:
                {anime.id}
              </p>
            </div>
            {getReservationStatus(anime.id) ? (
              <>
                <button
                  type="button"
                  className="anime-cancel-btn"
                  onClick={() => handleCancelReservation(anime.id)}
                >
                  Cancel Reservation
                </button>
              </>
            ) : (
              <button
                type="button"
                className="anime-reserve-btn"
                data-testid="cancel-reservation-button"
                onClick={() => handleReserveAnime(anime.id)}
              >
                Reserve Anime
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Animes;
