import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer from './features/Rockets/rocketSlice';
import missionsReducer from './features/Missions/missionsSlice';
import animesReducer from './features/Animes/animesSlice';
import genreReducer from './features/Genres/genreSlice';
import genrepageReducer, {
  fetchGenrePageData,
} from './features/Genres/pageSlice';

const store = configureStore({
  reducer: {
    rockets: rocketsReducer,
    missions: missionsReducer,
    animes: animesReducer,
    genre: genreReducer,
    genrespage: genrepageReducer,
  },
});
store.dispatch(fetchGenrePageData());
export default store;
