import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer from './features/Rockets/rocketSlice';
import missionsReducer from './features/Missions/missionsSlice';
import animesReducer from './features/Animes/animesSlice';
import genreReducer from './features/Genres/genreSlice';
import genrepageReducer from './features/Genres/pageSlice';
import detailsReducer from './features/Details/detailsSlice';

const store = configureStore({
  reducer: {
    rockets: rocketsReducer,
    missions: missionsReducer,
    animes: animesReducer,
    genre: genreReducer,
    genrespage: genrepageReducer,
    details: detailsReducer,
  },
});

export default store;
