import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Calorie tracker
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
