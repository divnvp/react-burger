import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Routes as RouteName } from '../../shared/consts/routes';
import { LoaderPage } from '../../pages/loader/loader';
import { useSelector } from '../../shared/hooks/store';

type Props = {
  element: JSX.Element;
  onlyUnAuth: boolean;
};

export const ProtectedRouteElement = (props: Props) => {
  const isAuthChecked = useSelector(state => state.login.checkingAuth);
  const user = useSelector(store => store.user);
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
