import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Rockets from './components/rockets';
import Missions from './components/missions';
import Animes from './components/Animes';
import MyProfile from './components/myProfile';
// import GenreList from './components/Genres';
import GenrePage from './components/GenrePage';
import HomePage from './components/Genre';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="devider" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/genres/:genreId" element={<GenrePage />} />
        <Route path="/Animes" element={<Animes />} />
        <Route path="/Rockets" element={<Rockets />} />
        <Route path="/Missions" element={<Missions />} />
        <Route path="/MyProfile" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
