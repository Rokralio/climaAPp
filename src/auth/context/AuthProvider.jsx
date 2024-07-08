import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from '../types/types'
import PropTypes from 'prop-types'

const init = () => {
  const user = JSON.parse( localStorage.getItem('user') );

  return  {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }) => {

  const [ authState, dispatch ] = useReducer( authReducer, {}, init );

  const login = async( name = '' ) => {
    const user = { id: 'ABC', name: name };
    const action = { type: types.login, payload: user };

    localStorage.setItem( 'user', JSON.stringify( user ) );

    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem( 'user' );
    const action = { type: types.logout };
    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout
    }}>
      { children }
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};