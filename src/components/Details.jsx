import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetails } from '../redux/features/Details/detailsSlice';
import {
  reserveAnime,
  cancelReservation,
} from '../redux/features/Animes/animesSlice';

const DetailsPage = () => {
  const { animeId } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.details);
  const [isReserved, setReserved] = useState(
    localStorage.getItem(`reserved_${animeId}`) === 'true',
  );

  useEffect(() => {
    dispatch(fetchDetails(animeId));
  }, [dispatch, animeId]);

  const handleReserveAnime = () => {
    dispatch(reserveAnime(animeId));
    setReserved(true);
  };

  const handleCancelReservation = () => {
    dispatch(cancelReservation(animeId));
    setReserved(false);
  };

  if (isLoading) {
    return <div>Loading anime details...</div>;
  }

  if (error) {
    return (
      <div>
        Error loading anime details:
        {error}
      </div>
    );
  }

  if (!data) {
    return <div>No anime details available</div>;
  }

  const { title, images, synopsis } = data;

  return (
    <div>
      <h1>{title}</h1>
      {isReserved ? <span className="anime-reserved">Reserved</span> : <></>}
      <div>
        <img src={images?.jpg?.image_url} alt={title} />
      </div>
      <div>{synopsis}</div>
      <div>
        <Link to={`/anime/${animeId}/details`}>See more details</Link>
      </div>
      <div>
        {isReserved ? (
          <button
            type="button"
            className="anime-cancel-btn"
            onClick={handleCancelReservation}
          >
            Cancel Reservation
          </button>
        ) : (
          <button
            type="button"
            className="anime-reserve-btn"
            onClick={handleReserveAnime}
          >
            Reserve Anime
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
