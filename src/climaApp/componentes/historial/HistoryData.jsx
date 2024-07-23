import PropTypes from 'prop-types';
import './historyData.css'; // Asegúrate de tener los estilos adecuados aquí

export const HistoryData = ({ historial }) => {

  const sortedHistorial = [...historial]
    .sort((a, b) => (b.timestamp ? new Date(b.timestamp) : 0) - (a.timestamp ? new Date(a.timestamp) : 0))
    .slice(0, 5);

  return (
    <div className="historial-container mt-1">
      <div>
        <button
          className="btn-historial"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse"
          aria-expanded="false"
          aria-controls="collapse"
        >
          Historial
        </button>
      </div>
      <div className="collapse" id="collapse">
        <div className="card card-body pergamino rounded-0">
          <ul className="list-group">
            <li className="list-group-item list-group-item-heading">
              <div className="d-flex justify-content-between">
                <span>Ciudad</span>
                <span>Tiempo</span>
              </div>
            </li>
            {sortedHistorial.length === 0 ? (
              <li className="list-group-item">No hay ciudades en el historial.</li>
            ) : (
              sortedHistorial.map((ciudad) => (
                <li key={ciudad.id} className="list-group-item pergamino-item">
                  <div className="d-flex justify-content-between">
                    <span>{ciudad.name}</span>
                    <span>{Math.floor((ciudad.tiempoRestante || 0) / 60000)} minutos</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

HistoryData.propTypes = {
  historial: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.string, // Hacer opcional
      tiempoRestante: PropTypes.number.isRequired
    })
  ).isRequired
};
