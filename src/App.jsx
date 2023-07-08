import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import NavBar from './components/NavBar';
import Animes from './components/Animes';
import MyProfile from './components/myProfile';
import GenrePage from './components/GenrePage';
import GenreList from './components/Genre';
import DetailsPage from './components/Details';
import AnimeDetailsPage from './components/AnimeDetailsPage';
import AnimeSearchPage from './components/SearchPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <div className="devider" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/genres" element={<GenreList />} />
          <Route path="/genres/:genreId" element={<GenrePage />} />
          <Route path="/anime/:animeId" element={<DetailsPage />} />
          <Route
            path="/anime/:animeId/details"
            element={<AnimeDetailsPage />}
          />
          <Route path="/anime" element={<Animes />} />
          <Route path="/search" element={<AnimeSearchPage />} />
          <Route path="/profile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
