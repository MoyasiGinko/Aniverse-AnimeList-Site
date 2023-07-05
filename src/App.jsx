import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Import your Redux store
import NavBar from './components/NavBar';
// import Rockets from './components/rockets';
// import Missions from './components/missions';
import Animes from './components/Animes';
import MyProfile from './components/myProfile';
import GenrePage from './components/GenrePage';
import HomePage from './components/Genre';
import DetailsPage from './components/Details';
import AnimeDetailsPage from './components/AnimeDetailsPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <div className="devider" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/genres/:genreId" element={<GenrePage />} />
          <Route path="/anime/:animeId" element={<DetailsPage />} />
          <Route
            path="/anime/:animeId/details"
            element={<AnimeDetailsPage />}
          />
          <Route path="/Animes" element={<Animes />} />
          {/* <Route path="/Rockets" element={<Rockets />} />
          <Route path="/Missions" element={<Missions />} /> */}
          <Route path="/MyProfile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
