
import predeterminado from '../../assets/images/predeterminado.jpg'
import './checkingAuth.css';

export const CheckingAuth = () => {
  return (
    <div className="checking-auth-container">
      <div 
        className="background-image" 
        style={{ backgroundImage: `url(${predeterminado})` }}>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};
