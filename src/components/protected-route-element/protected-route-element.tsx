import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { Routes as RouteName } from '../../shared/consts/routes';
import { RegisterUser } from '../../shared/models/register-user.type';

type Props = {
  element: JSX.Element;
  onlyUnAuth: boolean;
};

export const ProtectedRouteElement = (props: Props) => {
  const isAuthChecked = useSelector((state: unknown) => {
    return (state as { login: { checkingAuth: boolean } }).login.checkingAuth;
  });
  const user = useSelector((store: { user: RegisterUser }) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (props.onlyUnAuth && user?.email) {
    const { from } = location.state || { from: { pathname: RouteName.Main } };
    return <Navigate to={from} />;
  }

  if (!props.onlyUnAuth && !user?.email) {
    return <Navigate to={RouteName.Login} state={{ from: location }} />;
  }

  return props.element;
};

export const ProtectedAuthElement = ProtectedRouteElement;
export const ProtectedUnAuthElement = (props: { element: JSX.Element }) => (
  <ProtectedRouteElement onlyUnAuth={true} element={props.element} />
);
