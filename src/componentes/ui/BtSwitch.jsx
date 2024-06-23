import PropTypes from 'prop-types';
import './BtSwitch.css'

export const BtSwitch = ({ mostrarCelsius, toggleTemperatureUnit }) => {

  return (
    <div>
      <div className="custom-switch border rounded-3">
        <input
          className="custom-switch-input"
          type="checkbox"
          id="customSwitch"
          checked={!mostrarCelsius}
          onChange={toggleTemperatureUnit}
        />
        <label className="custom-switch-label" htmlFor="customSwitch">
          <span className="custom-switch-indicator" />
        </label>
      </div>
    </div>
  );
};

BtSwitch.propTypes = {
  mostrarCelsius: PropTypes.bool.isRequired,
  toggleTemperatureUnit: PropTypes.func.isRequired,
};
