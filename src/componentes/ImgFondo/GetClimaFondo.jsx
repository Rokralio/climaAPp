import PropTypes from 'prop-types';
import cielo from '../../assets/cielo.jpg';
import lluvia from '../../assets/lluvia.jpg';
import nublado from '../../assets/nublado.jpg';
import tormenta from '../../assets/tormenta.jpg';
import niebla from '../../assets/neblina.jpg';
import nieve from '../../assets/nevando.jpg';

export const GetClimaFondo = ({ descripcionClima }) => {

  const tiposDeClima = (descripcion) => {
    const lowerCaseDescripcion = descripcion.toLowerCase();

    if (lowerCaseDescripcion.includes('cielo despejado') ||
        lowerCaseDescripcion.includes('pocas nubes') ||
        lowerCaseDescripcion.includes('nubes dispersas') ||
        lowerCaseDescripcion.includes('muy nuboso') ||
        lowerCaseDescripcion.includes('nubes rotas')) {
      return 'cielo';
    } else if (lowerCaseDescripcion.includes('lluvia') ||
              lowerCaseDescripcion.includes('lluvia ligera') ||
              lowerCaseDescripcion.includes('lluvia intensa') ||
              lowerCaseDescripcion.includes('lluvia moderada')) {
      return 'lluvia';
    } else if (lowerCaseDescripcion.includes('nublado')) {
      return 'nublado';
    } else if (lowerCaseDescripcion.includes('tormenta')) {
      return 'tormenta';
    } else if (lowerCaseDescripcion.includes('niebla ligera') ||
              lowerCaseDescripcion.includes('niebla') ||
              lowerCaseDescripcion.includes('neblina') ||
              lowerCaseDescripcion.includes('humo')) {
      return 'neblina';
    } else if (lowerCaseDescripcion.includes('nieve') ||
              lowerCaseDescripcion.includes('nieve ligera') ||
              lowerCaseDescripcion.includes('nieve moderada') ||
              lowerCaseDescripcion.includes('nieve intensa') ||
              lowerCaseDescripcion.includes('nevada')) {
      return 'nevando';
    } else {
      return;
    }
  };

  const categoria = tiposDeClima(descripcionClima);
  
  const imageMap = {
    'cielo': cielo,
    'lluvia': lluvia,
    'nublado': nublado,
    'tormenta': tormenta,
    'niebla': niebla,
    'nieve': nieve,
  };

  const imageName = imageMap[categoria];

  const fondoStyle = {
    backgroundImage: `url(${imageName})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <div style={fondoStyle}>
    </div>
  );
};

GetClimaFondo.propTypes = {
  descripcionClima: PropTypes.string.isRequired,
};
