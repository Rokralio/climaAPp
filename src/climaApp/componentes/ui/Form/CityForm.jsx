import PropTypes from "prop-types";
import { useState } from "react";
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';

export const CityForm = ({ onFormSubmit, loading, requestCount }) => {
  const [city, setCity] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanCityName = city.replace(/\s+/g, ' ').trim();
    onFormSubmit(cleanCityName);
    setCity('');
  };

  return (
    <Box
      sx={{ p: 3, textAlign: 'center', backgroundColor: 'rgba(225, 225, 225, 0.98)' }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 1 }}>
          <TextField
            id="city"
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Ingrese una ciudad"
            required
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent', // Ocultar el borde cuando no está enfocado
                },
                '&:hover fieldset': {
                  borderColor: 'transparent', // Ocultar el borde cuando está en hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2', // Color del borde cuando está enfocado
                  borderWidth: '1px', // Borde fino cuando está enfocado
                },
              },
              '& .MuiInputBase-input': {
                cursor: 'pointer',
              },
            }}
          />
        </Box>
        <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
          {!loading ? (
            <Button
              type="submit"
              variant="contained"
              sx={{
                minWidth: '100%',
                backgroundColor: 'transparent',
                color: 'text.primary',
                fontWeight: 'bold', // Texto en negrita
                '&:hover': {
                  backgroundColor: 'transparent', // Sin cambio de color en hover
                  boxShadow: 'none', // Sin sombra en hover
                },
                border: 'none', // Sin borde
                boxShadow: 'none',
              }}
            >
              Enviar
            </Button>
          ) : (
            <CircularProgress size={24} />
          )}
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Peticiones restantes: {10 - requestCount}
        </Typography>
      </form>
    </Box>
  );
};

CityForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  requestCount: PropTypes.number.isRequired,
};
