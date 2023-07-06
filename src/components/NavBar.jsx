import { NavLink } from 'react-router-dom';
// import { FaMicrophone } from 'react-icons/fa';
// import { AiTwotoneSetting } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';

const NavBar = () => (
  <header className="header">
    <div className="logoDiv">
      <h1>React Capstone</h1>
    </div>
    <div className="container">
      <div className="nav-left">
        <NavLink to="/">
          <BsChevronLeft />
        </NavLink>
      </div>
      {/* <div className="nav-right">
        <FaMicrophone />
        <AiTwotoneSetting />
      </div> */}
    </div>
    <nav className="navBar">
      <NavLink to="/" activeclassname="active">
        Home
      </NavLink>
      <NavLink to="/genres" activeclassname="active">
        Genre
      </NavLink>
      <NavLink to="/anime" activeclassname="active">
        Animes
      </NavLink>
      <NavLink to="/search" activeclassname="active">
        Search
      </NavLink>
      <div className="line" />
      <NavLink to="/profile" activeclassname="active">
        MyProfile
      </NavLink>
    </nav>
  </header>
);

export default NavBar;
