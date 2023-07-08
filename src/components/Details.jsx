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
    <div className="details-page">
      <div className="details-container">
        <div className="details-header">
          <h1 className="details-title">{title}</h1>
        </div>
        <div className="details-content">
          <div className="details-image">
            <img src={images?.jpg?.image_url} alt={title} />
          </div>
          <div className="details-info">
            <div className="details-synopsis">
              <h2>Synopsis</h2>
              <p>{synopsis}</p>
            </div>
            <div className="details-actions">
              <div className="details-link">
                <Link to={`/anime/${animeId}/details`}>See more details</Link>
              </div>
              <div className="details-reservation">
                {isReserved ? (
                  <>
                    <span className="details-reserved">Added successfully</span>
                    <button
                      type="button"
                      className="details-cancel-btn"
                      onClick={handleCancelReservation}
                    >
                      Remove from List
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="details-reserve-btn"
                    onClick={handleReserveAnime}
                  >
                    Add to List
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
