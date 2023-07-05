import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchAnimes,
  cancelReservation,
} from '../../redux/features/Animes/animesSlice';

const MyAnimes = () => {
  const dispatch = useDispatch();
  const { animes, currentPage, status } = useSelector((state) => state.animes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAnimes(currentPage));
    }
  }, [status, dispatch, currentPage]);

  const handleCancelReservation = (animeId) => {
    localStorage.removeItem(`reserved_${animeId}`);
    dispatch(cancelReservation(animeId));
  };

  const reservedAnimes = animes.filter((anime) => {
    const reservedKey = `reserved_${anime.mal_id}`;
    const reservedValue = localStorage.getItem(reservedKey);
    return reservedValue === 'true';
  });

  console.log('animes:', animes);
  console.log('status:', status);
  console.log('reservedAnimes:', reservedAnimes);

  return (
    <div id="myprofile-animes">
      <h2>My Animes</h2>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <>
          {reservedAnimes.length > 0 ? (
            <table>
              <tbody>
                {reservedAnimes.map((anime) => (
                  <tr key={anime.mal_id}>
                    <td>{anime.title}</td>
                    <button
                      type="button"
                      className="anime-cancel-btn"
                      onClick={() => handleCancelReservation(anime.mal_id)}
                    >
                      Cancel Reservation
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No animes reserved.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MyAnimes;
