import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmaiPassword } from '../../store';
import { Box, Button, Container, Grid, TextField, Typography, Alert } from '@mui/material';
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
    <Box className="login-background" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ bgcolor: 'rgba(211, 211, 211, 0.9)', p: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>Registro</Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Nombre Completo"
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={formSubmitted && displayNameValid}
                InputProps={{ classes: { root: 'textFieldRoot', input: 'textFieldInput' } }}
                InputLabelProps={{ classes: { root: 'textFieldLabel' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Correo"
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={formSubmitted && emailValid}
                InputProps={{ classes: { root: 'textFieldRoot', input: 'textFieldInput' } }}
                InputLabelProps={{ classes: { root: 'textFieldLabel' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Contraseña"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={formSubmitted && passwordValid}
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
                disabled={isCheckingAuthentication}
                startIcon={<i className="bi bi-box-arrow-in-right"></i>}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Typography variant="body2">
                ¿Ya tienes cuenta? <Link to="/climaapp/login">Iniciar sesión</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};
