import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../../../store';

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { displayName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleMenuToggle = () => {
    setIsActive(!isActive);
  };

  const onLogout = () => {
    dispatch(startLogout());
    setIsActive(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar is-fixed-top has-background-black">
      <div className="navbar-brand">
        <a className="navbar-item has-text-weight-bold is-size-4" onClick={refreshPage}>
          ClimaApp
        </a>
        <NavLink to="climaapp/" className="navbar-item" onClick={() => setIsActive(false)}>
          Home
        </NavLink>
        <a
          role="button"
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded={isActive}
          onClick={handleMenuToggle}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-end">
          <div className="navbar-item">
            <span>{displayName}</span>
          </div>
          <div className="navbar-item">
            <button className="button is-light" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
