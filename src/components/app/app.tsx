import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  ForgotPasswordPage,
  IngredientsPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  IngredientDetailPage
} from '../../pages';
import { Routes as RoutesName } from '../../shared/consts/routes';
import {
  ProtectedAuthElement,
  ProtectedUnAuthElement
} from '../protected-route-element/protected-route-element';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuthThunk } from '../../services/actions/login';
import { UnknownAction } from 'redux';
import { useLocation } from 'react-router';
import Modal from '../modal/modal';
import { Routes as RouteName } from '../../shared/consts/routes';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { LoaderPage } from '../../pages/loader/loader';
import { LoadingType } from '../../shared/models/store/loading.type';
import { RegisterUser } from '../../shared/models/register-user.type';

type AppSelector = {
  loading: LoadingType;
  user: RegisterUser;
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const useAppSelector = useSelector.withTypes<AppSelector>();
  const loading = useAppSelector(state => state.loading.loading);
  const user = useAppSelector(state => state.user);
  const state = location.state as { backgroundLocation?: Location };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuthThunk() as unknown as UnknownAction);
  }, []);

  if (loading && !user?.email) {
    return <LoaderPage />;
  }

  return (
    <>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={RoutesName.IngredientDetail}
            element={
              <ProtectedAuthElement
                onlyUnAuth={false}
                element={
                  <Modal
                    isOpen={true}
                    title='Детали ингредиента'
                    onClick={() => navigate(RouteName.Main)}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}

      <Routes location={state?.backgroundLocation || location}>
        <Route
          path={RoutesName.IngredientDetail}
          element={
            <ProtectedAuthElement
              onlyUnAuth={false}
              element={<IngredientDetailPage />}
            />
          }
        />
        <Route path={RoutesName.Main} element={<MainPage />} />
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
    </>
  );
}

export default App;
