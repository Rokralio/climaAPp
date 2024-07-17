import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store';
import { Grid, TextField, Button, Alert, Typography, Container } from '@mui/material';
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
    dispatch( startLoginWithEmailPassword ({ email, password }) );
  };

  const onGoogleSignIn = () => {
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
          <Grid item xs={12} className="mb-3">
            <TextField
              type="email"
              className="form-control"
              id="email"
              label="Correo"
              placeholder="correo@gmail.com"
              name="email"
              value={email}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} className="mb-3">
            <TextField
              type="password"
              className="form-control"
              id="password"
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              name="password"
              value={password}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            {errorMessage && (
              <Alert severity="error">
                {errorMessage}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: '-10px' }}>
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    disabled={isAuthenticated}
    className="me-3"
    startIcon={<i className="bi bi-box-arrow-in-right me-2"></i>}
    sx={{ 
      boxShadow: 'none',
      '&:hover': { 
        boxShadow: 'none'
      },
    }}
  >
    Iniciar sesión
  </Button>
</Grid>

<Grid item xs={12}>
  <Button
    fullWidth
    variant="contained"
    sx={{ 
      backgroundColor: '#ffffff', 
      color: '#DB4437',
      boxShadow: 'none',
      border: '1px solid transparent',
      '&:hover': { 
        backgroundColor: '#ffffff',
        border: '1px solid #DB4437',
        boxShadow: 'none'
      },
    }}
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
