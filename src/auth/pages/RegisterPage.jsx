import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert, Grid, Typography, Container } from '@mui/material';
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
    <div className="login-background d-flex justify-content-center align-items-center">
      <Container className="login-container" component="main" maxWidth="xs">
        <Typography component="h1" variant="h5" className="mb-4">Registro</Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} className="mb-3">
              <TextField
                type="text"
                className="form-control"
                id="fullname"
                label="Nombre Completo"
                placeholder="Ingrese su nombre completo"
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={formSubmitted && displayNameValid}
                fullWidth
                variant="outlined"
              />
            </Grid>
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
                error={!!emailValid && formSubmitted}
                helperText={formSubmitted && emailValid}
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
                error={!!passwordValid && formSubmitted}
                helperText={formSubmitted && passwordValid}
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
            <Grid item xs={12}>
              <Button 
                disabled={isCheckingAuthentication}
                type="submit" 
                variant="contained" 
                color="primary" 
                className="me-3"
                fullWidth
                startIcon={<i className="bi bi-box-arrow-in-right me-2"></i>}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" className="mt-3">
            <Grid item>
              <Link to="/climaapp/login">
                ¿Ya tienes cuenta?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};
