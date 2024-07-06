import PropTypes from "prop-types";
import images from "../../../assets/images";
import "./GetClimaFondo.css";

export const GetClimaFondo = ({ descripcionClima }) => {

  const tiposDeClima = (descripcion) => {
    const lowerCaseDescripcion = descripcion.toLowerCase().trim();

    if (lowerCaseDescripcion.includes('cielo despejado') ||
        lowerCaseDescripcion.includes('cielo claro')) {
      return 'cielo_despejado';
    } else if (lowerCaseDescripcion.includes('pocas nubes')){
      return 'pocas_nubes';
    } else if (lowerCaseDescripcion.includes('nubes dispersas') ||
                lowerCaseDescripcion.includes('nubes')) {
      return 'nubes_dispersas';
    } else  if (lowerCaseDescripcion.includes('muy nuboso')){
      return 'muy_nuboso';
    } else if (lowerCaseDescripcion.includes('nubes rotas')) {
      return 'nubes_rotas';
    } else if (lowerCaseDescripcion.includes('lluvia')) {
      return 'lluvia';
    } else if (lowerCaseDescripcion.includes('lluvia de gran intensidad') ||
              lowerCaseDescripcion.includes('lluvia intensa')){
      return 'lluvia_intensa';
    } else if (lowerCaseDescripcion.includes('llovizna ligera')) {
      return 'llovizna_ligera';
    } else if (lowerCaseDescripcion.includes('lluvia moderada')) {
      return 'lluvia_moderada';
    } else if (lowerCaseDescripcion.includes('nublado')) {
      return 'nublado';
    } else if (lowerCaseDescripcion.includes('tormenta')) {
      return 'tormenta';
    } else if (lowerCaseDescripcion.includes('niebla ligera') ||
              lowerCaseDescripcion.includes('neblina')) {
      return 'neblina';
    } else if (lowerCaseDescripcion.includes('niebla') ||
              lowerCaseDescripcion.includes('humo')) {
      return 'niebla';
    } else if (lowerCaseDescripcion.includes('nieve') ||
              lowerCaseDescripcion.includes('nieve ligera')) {
      return 'nieve_ligera';
    } else if (lowerCaseDescripcion.includes('nieve moderada') ||
              lowerCaseDescripcion.includes('nieve intensa')) {
      return 'nieve';
    }else if (lowerCaseDescripcion.includes('nevada')) {
      return 'nevada';
    } else {
      return 'predeterminado';
    }
  };

  const categoria = tiposDeClima(descripcionClima);
  
  const imageMap = {
    'cielo_despejado': images.cielo_despejado,
    'pocas_nubes': images.pocas_nubes,
    'nubes_dispersas': images.nubes_dispersas,
    'muy_nuboso': images.muy_nuboso,
    'nubes_rotas': images.nubes_rotas,
    'lluvia': images.lluvia,
    'lluvia_intensa': images.lluvia_intensa,
    'llovizna_ligera': images.llovizna_ligera,
    'nublado': images.nublado,
    'tormenta': images.tormenta,
    'niebla': images.niebla,
    'nieve': images.nieve,
    'predeterminado': images.predeterminado,
  };

  const imageName = imageMap[categoria] || images.predeterminado;

  const imgFondo = {
    backgroundImage: `url(${imageName})`
  }

  return (
    <>
      <div className="stylFondo" style={imgFondo}></div>
    </>
  );
};

GetClimaFondo.propTypes = {
  descripcionClima: PropTypes.string.isRequired,
};
