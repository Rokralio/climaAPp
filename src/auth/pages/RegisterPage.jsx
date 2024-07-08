import { Link } from 'react-router-dom';
import './loginPage.css';

export const RegisterPage = () => {
  return (
    <div className="login-background pt-5 pb-3 d-flex flex-column justify-content-center align-items-center">
      <div className="login-container p-3">
        <h1 className="mb-4">Register</h1>
        <form>
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
          >
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Login
          </button>
          <button 
            type="button" 
            className="btn btn-danger"
          >
            <i className="bi bi-google me-2"></i>
            Inicia con Google
          </button>
          <p className="mt-3">
            ¿Ya tienes cuenta? <Link to="/climaapp/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
