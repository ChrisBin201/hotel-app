import { useState } from 'react';
import { Route, Redirect, Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AUTH_STATE } from '../state/auth-state';
import jsCookie from "js-cookie";
export { PrivateRoute };

function PrivateRoute({ children }) {
    const location = useLocation();
    let tokenUser = jsCookie.get("userToken")
    let tokenAdmin = jsCookie.get("adminToken")
    // const {isAuthenticated} = useRecoilValue(AUTH_STATE);
    if(tokenAdmin){
      if(location.pathname.includes("admin"))
        return children
      else 
        return <Navigate to="/" />;
    }
    if(tokenUser){
      if(location.pathname.includes("admin"))
        return <Navigate to="/" />;
      else 
        return children
      
    }
    return <Navigate to="/signin" />;
  }