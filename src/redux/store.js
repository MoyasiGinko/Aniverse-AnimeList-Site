import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer from './features/Rockets/rocketSlice';
import missionsReducer from './features/Missions/missionsSlice';
import animesReducer from './features/Animes/animesSlice';

const store = configureStore({
  reducer: {
    rockets: rocketsReducer,
    missions: missionsReducer,
    animes: animesReducer,
  },
});

export default store;
