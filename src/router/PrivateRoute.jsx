import { useContext } from 'react';
import { AuthContext } from '../auth';
import { Navigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export const PrivateRoute = ({ children }) => {

  const { logged } = useContext( AuthContext )
  return ( logged )
  ? children
  : <Navigate to="climaapp/login" />
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};