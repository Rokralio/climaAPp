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
    <div className="login-background">
      <div 
        className="container is-flex is-justify-content-center is-align-items-center" 
        style={{ minHeight: '100vh' }}
      >
        <div 
          className="box" 
          style={{ 
            backgroundColor: 'rgba(211, 211, 211, 0.95)', 
            padding: '1.5rem',  
            borderRadius: '8px',
            width: '500px', 
            maxWidth: '90%', 
          }}
        >
          <h1 className="title has-text-black has-text-centered">Iniciar sesión</h1>
          <form onSubmit={onSubmit}>
            <div className="field" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <div className="control">
                <input
                  className="input custom-input"
                  type="email"
                  placeholder="Correo"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="field" style={{ marginBottom: '1rem' }}>
              <div className="control">
                <input
                  className="input custom-input"
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="notification is-danger" style={{ marginBottom: '1rem' }}>
                {errorMessage}
              </div>
            )}
            <div className="field" style={{ marginTop: '1.5rem' }}>
              <div className="control">
                <button
                  className="button is-fullwidth is-medium"
                  type="submit"
                  disabled={isAuthenticated}
                  style={{
                    backgroundColor: '#007bff', 
                    border: 'none',
                    borderRadius: '0px',
                    padding: '0.4rem 0.4rem',
                  }}
                >
                  <i className="bi bi-box-arrow-in-right"></i> Iniciar sesión
                </button>
              </div>
            </div>
            <div className="field" style={{ marginTop: '1rem' }}>
              <div className="control">
                <button
                  className="button is-fullwidth is-white is-medium has-text-danger"
                  onClick={onGoogleSignIn}
                  disabled={isAuthenticated}
                  style={{
                    borderRadius: '0px',
                    backgroundColor: 'white',
                    border: 'none',
                    padding: '0.4rem 0.4rem',
                  }}
                >
                  <i className="bi bi-google"></i> Iniciar sesión con Google
                </button>
              </div>
            </div>
          </form>
          <div className="field mt-3 ">
            <p className="has-text-centered">
              ¿No tienes una cuenta? <Link to="/climaapp/register">Regístrate</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
