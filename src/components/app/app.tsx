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
  IngredientDetailPage,
  FeedPage
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
import { fetchIngredientsThunk } from '../../services/actions/burger-ingredients';
import { FeedDetailPage } from '../../pages/feed-detail/feed-detail';
import { FEEDS } from '../../services/actions/feeds';
import { v4 } from 'uuid';
import { Status } from '../../shared/consts/status.enum';

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
    dispatch(fetchIngredientsThunk() as unknown as UnknownAction);
    dispatch({
      type: FEEDS,
      payload: {
        feeds: {
          success: true,
          orders: [
            {
              ingredients: [
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa0942'
              ],
              _id: v4(),
              status: Status.Done,
              number: '034531',
              name: 'Interstellar бургер',
              createdAt: '2021-06-23T14:43:22.587Z',
              updatedAt: '2021-06-23T14:43:22.603Z'
            },
            {
              ingredients: [
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa093c'
              ],
              _id: v4(),
              status: Status.Done,
              number: '034532',
              name: 'Black Hole Singularity острый бургер',
              createdAt: '2024-11-17T20:13:23.654Z',
              updatedAt: '2021-06-23T20:13:23.657Z'
            },
            {
              ingredients: [
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa0941'
              ],
              _id: v4(),
              status: Status.Done,
              number: '034533',
              name: 'Black Hole Singularity острый бургер',
              createdAt: '2024-11-17T20:13:23.654Z',
              updatedAt: '2021-06-23T20:13:23.657Z'
            },
            {
              ingredients: [
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa0941'
              ],
              _id: v4(),
              status: Status.Pending,
              number: '034533',
              name: 'Black Hole Singularity острый бургер',
              createdAt: '2024-11-17T20:13:23.654Z',
              updatedAt: '2021-06-23T20:13:23.657Z'
            },
            {
              ingredients: [
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa0941'
              ],
              _id: v4(),
              status: Status.Created,
              number: '034533',
              name: 'Black Hole Singularity острый бургер',
              createdAt: '2024-11-17T20:13:23.654Z',
              updatedAt: '2021-06-23T20:13:23.657Z'
            }
          ],
          total: 28752,
          totalToday: 138
        }
      }
    });
  }, [dispatch]);

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
              <Modal
                isOpen={true}
                title='Детали ингредиента'
                onClick={() => navigate(RouteName.Main)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      <Routes location={state?.backgroundLocation || location}>
        <Route
          path={RoutesName.IngredientDetail}
          element={<IngredientDetailPage />}
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
        <Route path={RoutesName.Feed} element={<FeedPage />} />
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
        <Route path={`${RoutesName.Feed}/:id`} element={<FeedDetailPage />} />
        <Route path={RoutesName.NotFound} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
