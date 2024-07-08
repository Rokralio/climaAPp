import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './loginPage.css';

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    login('Roberto G.');

    navigate('climaapp/', {
      replace: true,
    });
  };

  return (
    <div className="login-background d-flex flex-column justify-content-center align-items-center">
      <div className="login-container p-3">
        <h1 className="mb-4">Login</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text" id="email-icon">
                <i className="bi bi-envelope"></i>
              </span>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="correo@gmail.com" 
                aria-describedby="emailHelp" 
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text" id="password-icon">
                <i className="bi bi-lock"></i>
              </span>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
              />
            </div>
          </div>
          <button 
            type="button" 
            className="btn btn-primary me-3" 
            onClick={onLogin}
          >
            Login
          </button>
          <button 
            type="button" 
            className="btn btn-danger"
          >
            <i className="bi bi-google me-2"></i>
            Login with Google
          </button>
          <p className="mt-3">
          ¿No tienes una cuenta? <Link to="/climaapp/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
