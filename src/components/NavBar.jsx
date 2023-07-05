import { NavLink } from 'react-router-dom';

// const handleMyProfileClick = () => {
//   window.location.load();
// };

const NavBar = () => (
  <header className="header">
    <div className="logoDiv">
      <h1>React Capstone</h1>
    </div>

    <nav className="navBar">
      <NavLink to="/" activeclassname="active">
        Home
      </NavLink>
      <NavLink to="/Animes" activeclassname="active">
        Animes
      </NavLink>
      <div className="line" />
      <NavLink to="/MyProfile" activeclassname="active">
        MyProfile
      </NavLink>
    </nav>
  </header>
);

export default NavBar;
