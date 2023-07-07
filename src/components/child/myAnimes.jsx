import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  fetchAnimes,
  cancelReservation,
} from '../../redux/features/Animes/animesSlice';

const MyAnimes = () => {
  const dispatch = useDispatch();
  const { currentPage, status } = useSelector((state) => state.animes);
  const [reservedAnimes, setReservedAnimes] = useState([]);

  const reservedAnimeIds = Object.keys(localStorage).filter((key) => key.startsWith('reserved_'));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAnimes(currentPage));
    }
  }, [status, dispatch, currentPage]);

  useEffect(() => {
    const fetchReservedAnimesData = async () => {
      const fetchedAnimes = [];
      /* eslint-disable */
      for (const animeId of reservedAnimeIds) {
        const id = animeId.split('_')[1]; // Remove the 'reserved_' prefix
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        fetchedAnimes.push(data.data);
      }
      /* eslint-enable */

      setReservedAnimes(fetchedAnimes);
    };

    fetchReservedAnimesData();
  }, [reservedAnimeIds]);

  const handleCancelReservation = (animeId) => {
    localStorage.removeItem(`reserved_${animeId}`);
    dispatch(cancelReservation(animeId));
  };

  return (
    <div id="myprofile-animes">
      <h2>My Anime List</h2>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <>
          {reservedAnimes.length > 0 ? (
            <table>
              <tbody>
                {reservedAnimes.map((anime) => (
                  <tr key={anime?.mal_id}>
                    <td>
                      <Link to={`/anime/${anime.mal_id}`}>
                        {anime?.title || 'Unknown Title'}
                      </Link>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="anime-cancel-btn"
                        onClick={() => handleCancelReservation(anime?.mal_id)}
                      >
                        Remove from List
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No animes added.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MyAnimes;
