import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { RegisterUser } from '../../shared/models/register-user.type';
import { Routes as RouteName } from '../../shared/consts/routes';

type Props = {
  element: JSX.Element;
  onlyUnAuth: boolean;
};

export const ProtectedRouteElement = (props: Props) => {
  const isAuthChecked = useSelector((state: unknown) => {
    return (state as { login: { checkingAuth: boolean } }).login.checkingAuth;
  });
  const user = useSelector(
    (store: { user: { user: RegisterUser } }) => store.user.user
  );
  const location = useLocation();

  console.log(isAuthChecked);
  if (!isAuthChecked) {
    return null;
  }

  if (props.onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: RouteName.Main } };
    return <Navigate to={from} />;
  }

  if (!props.onlyUnAuth && !user) {
    return <Navigate to={RouteName.Login} state={{ from: location }} />;
  }

  return props.element;
};

export const ProtectedUnAuthElement = (props: { element: JSX.Element }) => (
  <ProtectedRouteElement onlyUnAuth={true} element={props.element} />
);
