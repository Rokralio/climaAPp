import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store';
import { Box, Button, Container, Grid, TextField, Typography, Alert } from '@mui/material';
import './styles.css'

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
    <Box className="login-background" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ bgcolor: 'rgba(211, 211, 211, 0.9)', p: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>Iniciar sesión</Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Correo"
                name="email"
                value={email}
                onChange={onInputChange}
                InputProps={{ classes: { root: 'textFieldRoot', input: 'textFieldInput' } }}
                InputLabelProps={{ classes: { root: 'textFieldLabel' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Contraseña"
                name="password"
                type="password"
                value={password}
                onChange={onInputChange}
                InputProps={{ classes: { root: 'textFieldRoot', input: 'textFieldInput' } }}
                InputLabelProps={{ classes: { root: 'textFieldLabel' } }}
              />
            </Grid>
            {errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isAuthenticated}
                startIcon={<i className="bi bi-box-arrow-in-right"></i>}
              >
                Iniciar sesión
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Gris claro en hover
                  }
                }}
                fullWidth
                variant="outlined"
                color="error"
                onClick={onGoogleSignIn}
                disabled={isAuthenticated}
                startIcon={<i className="bi bi-google"></i>}
              >
                Iniciar sesión con Google
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Typography variant="body2">
                ¿No tienes una cuenta? <Link to="/climaapp/register">Regístrate</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};
