import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store';
import './styles.css';

export const LoginPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  });

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <div className="login-background d-flex justify-content-center align-items-center">
      <div className="login-container container">
        <h1 className="mb-4 text-center">Iniciar sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Correo"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="col-12 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="col-12 mb-3">
                <div className="alert alert-danger">
                  {errorMessage}
                </div>
              </div>
            )}
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isAuthenticated}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Iniciar sesión
              </button>
            </div>
            <div className="col-12 mb-3">
              <button
                className="btn btn-light w-100 text-danger"
                onClick={onGoogleSignIn}
                disabled={isAuthenticated}
              >
                <i className="bi bi-google me-2"></i>
                Iniciar sesión con Google
              </button>
            </div>
          </div>
          <div className="row justify-content-end mt-3">
            <div className="col-auto">
              <span>¿No tienes una cuenta? </span>
              <Link to="/climaapp/register">
                Regístrate
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
