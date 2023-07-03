import { NavLink } from 'react-router-dom';
import planet from '../assets/planet.png';

const NavBar = () => (
  <header className="header">
    <div className="logoDiv">
      <img src={planet} alt="logo" className="logo" />

      <h1>React Capstone</h1>
    </div>

    <nav className="navBar">
      <NavLink to="/" activeclassname="active">
        Animes
      </NavLink>
      <NavLink to="/Rockets" activeclassname="active">
        Rockets
      </NavLink>
      <NavLink to="/Missions" activeclassname="active">
        Missions
      </NavLink>
      <div className="line" />
      <NavLink to="/MyProfile" activeclassname="active">
        MyProfile
      </NavLink>
    </nav>
  </header>
);

export default NavBar;
