import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetails } from '../redux/features/Details/detailsSlice';

const DetailsPage = () => {
  const { animeId } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(fetchDetails(animeId));
  }, [dispatch, animeId]);

  if (isLoading) {
    return <div>Loading anime details...</div>;
  }

  if (error) {
    return <div>Error loading anime details: {error}</div>;
  }

  if (!data) {
    return <div>No anime details available</div>;
  }

  const { title, images, synopsis } = data;

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <img src={images?.jpg?.image_url} alt={title} />
      </div>
      <div>{synopsis}</div>
    </div>
  );
};

export default DetailsPage;
