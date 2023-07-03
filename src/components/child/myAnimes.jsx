import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchAnimes,
  cancelReservation,
} from '../../redux/features/Animes/animesSlice';

const MyAnimes = () => {
  const dispatch = useDispatch();
  const { animes, status } = useSelector((state) => state.animes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAnimes());
    }
  }, [status, dispatch]);

  const handleCancelReservation = (animeId) => {
    localStorage.removeItem(`reserved_${animeId}`);
    dispatch(cancelReservation(animeId));
  };

  const reservedAnimes = animes.filter((anime) => anime.reserved);

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
                  <tr key={anime.id}>
                    <td>{anime.name}</td>
                    <button
                      type="button"
                      className="anime-cancel-btn"
                      onClick={() => handleCancelReservation(anime.id)}
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
