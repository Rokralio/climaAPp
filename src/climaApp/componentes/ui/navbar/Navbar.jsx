import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../../../store';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { displayName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const onLogout = () => {

    dispatch(startLogout());
    closeNavbar();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2 fixed-top">
      <div className="container-fluid">
        <h1
          className="fw-bold text-white me-4"
          onClick={refreshPage}
          style={{ cursor: 'pointer' }}
        >
          ClimaApp
        </h1>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="climaapp/" end onClick={closeNavbar}>
              Home
            </NavLink>
          </li>
        </ul>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={isNavbarOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-auto">
              <span className="nav-link text-info">{displayName}</span>
            </li>
            <li className="nav-item">
              <button className="nav-link btn ms-auto" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
