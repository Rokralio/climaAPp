import PropTypes from 'prop-types';
import './historyData.css';

export const HistoryData = ({ historial, requestCount }) => { 
  const sortedHistorial = [...historial]
    .sort((a, b) => (b.timestamp ? new Date(b.timestamp) : 0) - (a.timestamp ? new Date(a.timestamp) : 0))
    .slice(0, 10);

  return (
    <div className="historial-container mt-0">
      <div className="header">
        <p className="header-item">Peticiones restantes: {10 - requestCount}</p>
      </div>
      <div className="card card-body pergamino rounded-0">
        <ul className="list-group p-1">
          {sortedHistorial.length > 0 && sortedHistorial.map((ciudad) => (
            <li key={ciudad.id} className="list-group-item pergamino-item">
              <div className="d-flex justify-content-between">
                <span>{ciudad.name}</span>
                <span>{ciudad.climate.description}</span>
                <span>{ciudad.countryCode}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

HistoryData.propTypes = {
  historial: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      climate: PropTypes.shape({
        description: PropTypes.string.isRequired,
        temperature: PropTypes.string.isRequired,
        feelsLike: PropTypes.string.isRequired,
        tempMin: PropTypes.string.isRequired,
        tempMax: PropTypes.string.isRequired,
      }).isRequired,
      countryCode: PropTypes.string.isRequired,
      timestamp: PropTypes.string
    })
  ).isRequired,
  requestCount: PropTypes.number.isRequired,
};

// import PropTypes from 'prop-types';
// import './historyData.css';

// export const HistoryData = ({ historial, requestCount }) => { 
//   const sortedHistorial = [...historial]
//     .sort((a, b) => (b.timestamp ? new Date(b.timestamp) : 0) - (a.timestamp ? new Date(a.timestamp) : 0))
//     .slice(0, 10);

//   return (
//     <div className="historial-container mt-0">
//       <div className="header">
//         <p className="header-item">Peticiones restantes: {10 - requestCount}</p>
//       </div>
//       <div className="card card-body pergamino rounded-0">
//         <ul className="list-group p-1">
//           {sortedHistorial.length > 0 && sortedHistorial.map((ciudad) => (
//             <li key={ciudad.id} className="list-group-item pergamino-item">
//               <div className="d-flex justify-content-between">
//                 <span>{ciudad.name}</span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// HistoryData.propTypes = {
//   historial: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       timestamp: PropTypes.string
//     })
//   ).isRequired,
//   requestCount: PropTypes.number.isRequired,
// };
