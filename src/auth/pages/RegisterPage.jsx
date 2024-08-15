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
    <div className="login-background d-flex justify-content-center align-items-center">
      <div className="login-container container">
        <h1 className="mb-4 text-center">Registro</h1>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${!!displayNameValid && formSubmitted ? 'is-invalid' : ''}`}
                  id="fullname"
                  placeholder="Nombre Completo"
                  name="displayName"
                  value={displayName}
                  onChange={onInputChange}
                />
                {formSubmitted && displayNameValid && (
                  <div className="invalid-feedback">{displayNameValid}</div>
                )}
              </div>
            </div>
            <div className="col-12 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className={`form-control ${!!emailValid && formSubmitted ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Correo"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
                {formSubmitted && emailValid && (
                  <div className="invalid-feedback">{emailValid}</div>
                )}
              </div>
            </div>
            <div className="col-12 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className={`form-control ${!!passwordValid && formSubmitted ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
                {formSubmitted && passwordValid && (
                  <div className="invalid-feedback">{passwordValid}</div>
                )}
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
                disabled={isCheckingAuthentication}
                type="submit"
                className="btn btn-primary w-100"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Registrar
              </button>
            </div>
          </div>
          <div className="row justify-content-end mt-3">
            <div className="col-auto">
              <Link to="/climaapp/login">
                ¿Ya tienes cuenta?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// import { useMemo, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { Alert, Grid, Typography, Container, InputAdornment } from '@mui/material';
// import { useForm } from '../../hooks';
// import { startCreatingUserWithEmaiPassword } from '../../store';
// import './styles.css';

// const formData = {
//   email: '',
//   password: '',
//   displayName: ''
// };

// const formValidations = {
//   email: [(value) => value.includes('@'), 'El correo debe de tener un @'],
//   password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
//   displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
// };

// export const RegisterPage = () => {
//   const dispatch = useDispatch();
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const { status, errorMessage } = useSelector(state => state.auth);
//   const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
//   const { formState, displayName, email, password, onInputChange,
//         isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);

//   const onSubmit = (event) => {
//     event.preventDefault();
//     setFormSubmitted(true);
//     if (!isFormValid) return;
//     dispatch(startCreatingUserWithEmaiPassword(formState));
//   };

//   return (
//     <div className="login-background d-flex justify-content-center align-items-center">
//       <Container className="login-container" component="main" maxWidth="xs">
//         <Typography component="h1" variant="h5" className="mb-4">Registro</Typography>
//         <form onSubmit={onSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} className="mb-3">
//               <TextField
//                 type="text"
//                 className="form-control"
//                 id="fullname"
//                 placeholder="Nombre Completo"
//                 name="displayName"
//                 value={displayName}
//                 onChange={onInputChange}
//                 error={!!displayNameValid && formSubmitted}
//                 helperText={formSubmitted && displayNameValid}
//                 fullWidth
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="bi bi-person"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} className="mb-3">
//               <TextField
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="Correo"
//                 name="email"
//                 value={email}
//                 onChange={onInputChange}
//                 error={!!emailValid && formSubmitted}
//                 helperText={formSubmitted && emailValid}
//                 fullWidth
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="bi bi-envelope"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} className="mb-3">
//               <TextField
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 placeholder="Contraseña"
//                 name="password"
//                 value={password}
//                 onChange={onInputChange}
//                 error={!!passwordValid && formSubmitted}
//                 helperText={formSubmitted && passwordValid}
//                 fullWidth
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="bi bi-lock"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               {errorMessage && (
//                 <Alert severity="error">
//                   {errorMessage}
//                 </Alert>
//               )}
//             </Grid>
//             <Grid item xs={12}>
//               <Button 
//                 disabled={isCheckingAuthentication}
//                 type="submit" 
//                 variant="contained" 
//                 color="primary" 
//                 className="me-3"
//                 fullWidth
//                 startIcon={<i className="bi bi-box-arrow-in-right me-2"></i>}
//               >
//                 Registrar
//               </Button>
//             </Grid>
//           </Grid>
//           <Grid container justifyContent="flex-end" className="mt-3">
//             <Grid item>
//               <Link to="/climaapp/login">
//                 ¿Ya tienes cuenta?
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     </div>
//   );
// };
