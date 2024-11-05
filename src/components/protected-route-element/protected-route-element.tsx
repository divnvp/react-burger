import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { Routes as RouteName } from '../../shared/consts/routes';
import { RegisterUser } from '../../shared/models/register-user.type';
import { LoaderPage } from '../../pages/loader/loader';

type Props = {
  element: JSX.Element;
  onlyUnAuth: boolean;
};
type ProtectedRouteSelector = {
  login: { checkingAuth: boolean };
  user: RegisterUser & { isAuth?: boolean };
};

export const ProtectedRouteElement = (props: Props) => {
  const useProtectedRouteSelector =
    useSelector.withTypes<ProtectedRouteSelector>();
  const isAuthChecked = useProtectedRouteSelector(
    state => state.login.checkingAuth
  );
  const user = useProtectedRouteSelector(store => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <LoaderPage />;
  }

  if (props.onlyUnAuth && user?.isAuth) {
    const { from } = location.state || { from: { pathname: RouteName.Main } };
    return <Navigate to={from} />;
  }

  if (!props.onlyUnAuth && !user?.isAuth) {
    return <Navigate to={RouteName.Login} state={{ from: location }} />;
  }

  return props.element;
};

export const ProtectedAuthElement = ProtectedRouteElement;
export const ProtectedUnAuthElement = (props: { element: JSX.Element }) => (
  <ProtectedRouteElement onlyUnAuth={true} element={props.element} />
);
