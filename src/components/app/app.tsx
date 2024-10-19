import React from 'react';
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
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={RoutesName.Main}
          element={<ProtectedRouteElement element={<MainPage />} />}
        />
        <Route path={RoutesName.Login} element={<LoginPage />} />
        <Route path={RoutesName.Register} element={<RegisterPage />} />
        <Route
          path={RoutesName.ForgotPassword}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={RoutesName.ResetPassword}
          element={<ResetPasswordPage />}
        />
        <Route
          path={RoutesName.Profile}
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route
          path={`${RoutesName.Ingredients}/:id`}
          element={<ProtectedRouteElement element={<IngredientsPage />} />}
        />
        <Route path={RoutesName.NotFound} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
