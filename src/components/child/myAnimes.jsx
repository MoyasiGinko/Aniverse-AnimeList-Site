import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  fetchAnimes,
  cancelReservation,
} from '../../redux/features/Animes/animesSlice';
import 'regenerator-runtime/runtime';

const MyAnimes = () => {
  const dispatch = useDispatch();
  const { currentPage, status, error } = useSelector((state) => state.animes);
  const [reservedAnimes, setReservedAnimes] = useState({});
  const reservedAnimeIds = Object.keys(localStorage).filter((key) => key.startsWith('reserved_'));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAnimes(currentPage));
    }
  }, [status, dispatch, currentPage]);

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is still mounted

    const fetchReservedAnimesData = async () => {
      if (reservedAnimeIds.length === 0) {
        return; // No reserved anime IDs, no need to fetch data
      }

      const fetchedAnimes = {};

      try {
        // Fetch anime data for each reserved anime ID
        await Promise.all(
          reservedAnimeIds.map(async (animeId) => {
            const id = animeId.replace('reserved_', ''); // Remove the 'reserved_' prefix
            const response = await fetch(
              `https://api.jikan.moe/v4/anime/${id}`,
            );
            const data = await response.json();
            fetchedAnimes[animeId] = data.data;
          }),
        );

        if (isMounted) {
          setReservedAnimes(fetchedAnimes);
        }
      } catch (error) {
        console.error('Error fetching reserved animes:', error);
      }
    };

    fetchReservedAnimesData();

    return () => {
      isMounted = false; // Clean up: set isMounted to false when component unmounts
    };
  }, [reservedAnimeIds]);

  const handleCancelReservation = (animeId) => {
    const id = animeId.replace('reserved_', ''); // Remove the 'reserved_' prefix
    localStorage.removeItem(`reserved_${animeId}`);
    dispatch(cancelReservation(id));
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error:
        {error.message}
      </p>
    );
  }

  return (
    <div id="myprofile-animes">
      <h2>Anime List</h2>
      {reservedAnimeIds.length > 0 ? (
        <table>
          <tbody>
            {reservedAnimeIds.map((animeId) => (
              <tr key={animeId}>
                <td>
                  <Link to={`/anime/${reservedAnimes[animeId]?.mal_id}`}>
                    {reservedAnimes[animeId]?.title || 'Unknown Title'}
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    className="anime-cancel-btn"
                    onClick={() => handleCancelReservation(animeId)}
                  >
                    Remove from List
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No animes available.</p>
      )}
    </div>
  );
};

export default MyAnimes;
