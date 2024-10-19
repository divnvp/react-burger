import { JSX, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Routes as RouteName } from '../../shared/consts/routes';
import { setCookie } from '../../shared/utils/set-cookie';

export const ProtectedRouteElement = (props: { element: JSX.Element }) => {
  const auth = useSelector((state: unknown) => {
    return (state as { login: { checkingAuth: boolean } }).login.checkingAuth;
  });

  useEffect(() => {
    if (!auth) {
      setCookie('accessToken', '');
      localStorage.removeItem('refreshToken');
    }
  }, [auth]);

  return auth ? props.element : <Navigate to={RouteName.Login} />;
};
