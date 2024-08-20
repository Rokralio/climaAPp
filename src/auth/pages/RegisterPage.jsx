import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmaiPassword } from '../../store';
import './styles.css';

const formData = {
  email: '',
  password: '',
  displayName: ''
};

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener un @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
  const { formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmaiPassword(formState));
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
          <h1 className="title has-text-black has-text-centered">Registro</h1>
          <form onSubmit={onSubmit}>
            <div className="field" style={{ marginBottom: '1rem', marginTop: '1rem' }}>
              <div className="control">
                <input
                  className={`input is-medium ${formSubmitted && displayNameValid ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="Nombre Completo"
                  name="displayName"
                  value={displayName}
                  onChange={onInputChange}
                  style={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '0px',
                    color: 'black',
                    fontSize: '1rem',
                    padding: '0.75rem 1.25rem',
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 255, 0.5)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
              {formSubmitted && displayNameValid && <p className="help is-danger">{displayNameValid}</p>}
            </div>

            <div className="field" style={{ marginBottom: '1rem' }}>
              <div className="control">
                <input
                  className={`input is-medium ${formSubmitted && emailValid ? 'is-danger' : ''}`}
                  type="email"
                  placeholder="Correo"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  style={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '0px',
                    color: 'black',
                    fontSize: '1rem',
                    padding: '0.75rem 1.25rem',
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 255, 0.5)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
              {formSubmitted && emailValid && <p className="help is-danger">{emailValid}</p>}
            </div>

            <div className="field" style={{ marginBottom: '1.5rem' }}>
              <div className="control">
                <input
                  className={`input is-medium ${formSubmitted && passwordValid ? 'is-danger' : ''}`}
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  style={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '0px',
                    color: 'black',
                    fontSize: '1rem',
                    padding: '0.75rem 1.25rem',
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 255, 0.5)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
              {formSubmitted && passwordValid && <p className="help is-danger">{passwordValid}</p>}
            </div>

            {errorMessage && (
              <div className="notification is-danger" style={{ marginBottom: '1.5rem' }}>
                {errorMessage}
              </div>
            )}

            <div className="field" style={{ marginTop: '1rem' }}>
              <div className="control">
                <button
                  className="button is-fullwidth is-medium"
                  type="submit"
                  disabled={isCheckingAuthentication}
                  style={{
                    backgroundColor: '#007bff', 
                    border: 'none',
                    borderRadius: '0px', 
                    padding: '0.4rem 0.4rem',
                  }}
                >
                  Registrar
                </button>
              </div>
            </div>
          </form>
          <div className="field mt-3">
            <p className="has-text-centered">
              ¿Ya tienes cuenta? <Link to="/climaapp/login">Iniciar sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
