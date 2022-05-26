import { Route, Redirect, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AUTH_STATE } from '../state/auth-state';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const {isAuthenticated} = useRecoilValue(AUTH_STATE);
    return isAuthenticated ? children : <Navigate to="/signin" />;
  }