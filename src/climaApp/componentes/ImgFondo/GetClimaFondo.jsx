import PropTypes from "prop-types";
import images from "../../../assets/images";
import "./GetClimaFondo.css";

const getClima = {
  'aguanieve ligero'             : 'aguanieve_ligero',
  'arena'                        : 'arena',
  'el cielo está despejado'      : 'cielo_despejado',
  'El cielo está despejado'      : 'cielo_despejado',
  'cielo claro'                  : 'cielo_despejado',
  'fuertes nevadas'              : 'nieve',
  'fumar'                        : 'humo',
  'llovizna de intensidad ligera': 'lluvia_ligera',
  'llovizna'                     : 'llovizna',
  'lluvia de gran intensidad'    : 'lluvia_intensa',
  'lluvia de intensidad ligera'  : 'lluvia_de_intensidad_ligera',
  'lluvia de proximidad'         : 'lluvia_de_proximidad',
  'lluvia helada'                : 'lluvia_helada',
  'lluvia ligera de nieve'       : 'lluvia_ligera_de_nieve',
  'lluvia ligera'                : 'lluvia_ligera',
  'lluvia moderada'              : 'lluvia_moderada',
  'neblina'                      : 'neblina',
  'niebla'                       : 'niebla',
  'nieve ligera'                 : 'nieve_ligera',
  'nieve'                        : 'nieve',
  'nubes cubiertas'              : 'nubes_cubiertas',
  'nubes dispersas'              : 'nubes_dispersas',
  'algo de nubes'                : 'nubes_dispersas',
  'nubes rotas'                  : 'nubes_rotas',
  'pocas nubes'                  : 'pocas_nubes',
  'nubes'                        : 'pocas_nubes',
  'polvo'                        : 'polvo',
  'proximidad lluvia moderada'   : 'nublado',
  'tormenta con lluvia ligera'   : 'tormenta_con_lluvia',
  'tormenta con lluvia'          : 'tormenta_con_lluvia',
  'tormenta'                     : 'tormenta',
  'muy nuboso'                   : 'muy_nuboso',
}

export const GetClimaFondo = ({ descripcionClima }) => {

  const tipoClima = getClima[ descripcionClima.toLowerCase().trim() ] || 'predeterminado';

  const imageName = images[tipoClima] || images.predeterminado;

  return (
    <div className="stylFondo" style={{ backgroundImage: `url(${imageName})` }}></div>
  );
};

GetClimaFondo.propTypes = {
  descripcionClima: PropTypes.string.isRequired,
};
