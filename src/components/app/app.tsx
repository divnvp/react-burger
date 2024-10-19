import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ForgotPasswordPage,
  IngredientsPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage
} from '../../pages';
import { Routes as RoutesName } from '../../shared/consts/routes';
import {
  ProtectedRouteElement,
  ProtectedUnAuthElement
} from '../protected-route-element/protected-route-element';
import { useDispatch } from 'react-redux';
import { checkUserAuthThunk } from '../../services/actions/login';
import { UnknownAction } from 'redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuthThunk() as unknown as UnknownAction);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path={RoutesName.Main}
          element={
            <ProtectedRouteElement onlyUnAuth={true} element={<MainPage />} />
          }
        />
        <Route
          path={RoutesName.Login}
          element={<ProtectedUnAuthElement element={<LoginPage />} />}
        />
        <Route
          path={RoutesName.Register}
          element={<ProtectedUnAuthElement element={<RegisterPage />} />}
        />
        <Route
          path={RoutesName.ForgotPassword}
          element={<ProtectedUnAuthElement element={<ForgotPasswordPage />} />}
        />
        <Route
          path={RoutesName.ResetPassword}
          element={<ProtectedUnAuthElement element={<ResetPasswordPage />} />}
        />
        <Route
          path={RoutesName.Profile}
          element={
            <ProtectedRouteElement
              onlyUnAuth={true}
              element={<ProfilePage />}
            />
          }
        />
        <Route
          path={`${RoutesName.Ingredients}/:id`}
          element={
            <ProtectedRouteElement
              onlyUnAuth={true}
              element={<IngredientsPage />}
            />
          }
        />
        <Route path={RoutesName.NotFound} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
