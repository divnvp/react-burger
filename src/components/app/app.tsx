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
  ProtectedAuthElement,
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
            <ProtectedAuthElement onlyUnAuth={false} element={<MainPage />} />
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
            <ProtectedAuthElement
              onlyUnAuth={false}
              element={<ProfilePage />}
            />
          }
        />
        <Route
          path={`${RoutesName.Ingredients}/:id`}
          element={
            <ProtectedAuthElement
              onlyUnAuth={false}
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
