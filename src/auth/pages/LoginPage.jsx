import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './loginPage.css';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';
import { Grid, TextField, Button, Alert, Typography, Container } from '@mui/material';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: 'roberto@gmail.com',
    password: '1234'
  });

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(checkingAuthentication());
    navigate('climaapp/', {
      replace: true,
    });
  };

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  };

  return (
    <div className="login-background d-flex justify-content-center align-items-center">
      <Container className="login-container" component="main" maxWidth="xs">
        <Typography component="h1" variant="h5" className="mb-4">
          Iniciar sesión
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onInputChange}
                InputProps={{
                  startAdornment: (
                    <i className="bi bi-envelope" />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onInputChange}
                InputProps={{
                  startAdornment: (
                    <i className="bi bi-lock" />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {errorMessage && (
                <Alert severity="error">
                  {errorMessage}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isAuthenticated}
                className="me-3"
              >
                Iniciar sesión
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={onGoogleSignIn}
                disabled={isAuthenticated}
                startIcon={<i className="bi bi-google" />}
              >
                Iniciar sesión con Google
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" className="mt-3">
            <Grid item>
              <span> ¿No tienes una cuenta? </span>
              <Link to="/climaapp/register">
                Regístrate
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};
