import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Switch, Box } from '@mui/material';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const convertirCelsiusAFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
};

export const ClimaCard = ({ data }) => {
  const [unidad, setUnidad] = useState('C');

  const toggleUnidad = () => {
    setUnidad(unidad === 'C' ? 'F' : 'C');
  };

  const mostrarTemperatura = () => {
    const temp = unidad === 'C' ? data.climaData.temp : convertirCelsiusAFahrenheit(data.climaData.temp);
    return temp.toFixed(1) + ` °${unidad}`;
  };

  const mostrarSensacionTermica = () => {
    const feelsLike = unidad === 'C' ? data.climaData.feels_like : convertirCelsiusAFahrenheit(data.climaData.feels_like);
    return feelsLike.toFixed(1) + ` °${unidad}`;
  };

  const mostrarTemperaturaMinima = () => {
    const tempMin = unidad === 'C' ? data.climaData.temp_min : convertirCelsiusAFahrenheit(data.climaData.temp_min);
    return tempMin.toFixed(1) + ` °${unidad}`;
  };

  const mostrarTemperaturaMaxima = () => {
    const tempMax = unidad === 'C' ? data.climaData.temp_max : convertirCelsiusAFahrenheit(data.climaData.temp_max);
    return tempMax.toFixed(1) + ` °${unidad}`;
  };

  return (
    <Card sx={{ width: '100%', backgroundColor: 'rgba(225, 225, 225, 0.98)', marginBottom: 2 }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">{data.city}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch checked={unidad === 'F'} onChange={toggleUnidad} color="primary" sx={{ marginLeft: 1 }} />
            <Typography variant="body1">{unidad === 'C' ? '°C' : '°F'}</Typography>
          </Box>
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'white' }}>País:</TableCell>
                <TableCell sx={{ backgroundColor: 'rgba(230, 230, 230)' }} align="center">{data.country}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'white' }}>Tipo de clima:</TableCell>
                <TableCell sx={{ backgroundColor: 'rgba(230, 230, 230)' }} align="center">
                  {capitalizeFirstLetter(data.climaData.description || 'N/A')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'white' }}>Temperatura:</TableCell>
                <TableCell sx={{ backgroundColor: 'rgba(230, 230, 230)' }} align="center">{mostrarTemperatura()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'white' }}>Sensación térmica:</TableCell>
                <TableCell sx={{ backgroundColor: 'rgba(230, 230, 230)' }} align="center">{mostrarSensacionTermica()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'white' }}>Temperatura mínima:</TableCell>
                <TableCell sx={{ backgroundColor: 'rgba(230, 230, 230)' }} align="center">{mostrarTemperaturaMinima()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'white' }}>Temperatura máxima:</TableCell>
                <TableCell sx={{ backgroundColor: 'rgba(230, 230, 230)' }} align="center">{mostrarTemperaturaMaxima()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

ClimaCard.propTypes = {
  data: PropTypes.object.isRequired,
};
