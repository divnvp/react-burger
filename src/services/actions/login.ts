import { RegisterUser } from '../../shared/models/register-user.type';
import { ActionType } from '../../shared/models/action.type';
import { loginUser, logout, refreshToken } from '../../shared/api/auth.service';
import { setCookie } from '../../shared/utils/set-cookie';
import { Response } from '../../shared/models/response.type';
import { UnknownAction } from 'redux';
import { fetchUserThunk } from './user';
import {
  CHECKING_AUTH,
  IS_USER_AUTH,
  LOADING,
  LOGIN,
  LOGIN_REJECTED,
  LOGIN_REQUEST,
  LOGOUT,
  LOGOUT_REJECTED,
  LOGOUT_REQUEST,
  REFRESH_TOKEN,
  REFRESH_TOKEN_REJECTED,
  REFRESH_TOKEN_REQUEST,
  USER_GETTING
} from '../constants';

export const fetchLoginThunk =
  (credits: RegisterUser) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      await loginUser(credits).then((response: Response) => {
        setCookie('accessToken', response.accessToken!);
        localStorage.setItem('refreshToken', response.refreshToken!);

        dispatch({ type: LOGIN, payload: response });
        dispatch({ type: USER_GETTING, payload: response.user });
        dispatch({ type: CHECKING_AUTH, payload: { checkingAuth: true } });
        dispatch({ type: IS_USER_AUTH, payload: { isAuth: true } });
      });
    } catch (e) {
      dispatch({ type: LOGIN_REJECTED, payload: { error: e } });
      dispatch({ type: CHECKING_AUTH, payload: { checkingAuth: true } });
      dispatch({ type: IS_USER_AUTH, payload: { isAuth: false } });
    }
  };

export const fetchLogoutThunk =
  () => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: LOGOUT_REQUEST });

    try {
      await logout(localStorage.getItem('refreshToken')!).then(
        (response: Response) => {
          setCookie('accessToken', '');
          localStorage.removeItem('refreshToken');

          dispatch({ type: LOGOUT, payload: response });
          dispatch({ type: CHECKING_AUTH, payload: { checkingAuth: true } });
          dispatch({
            type: USER_GETTING,
            payload: { email: undefined, password: undefined, name: undefined }
          });
          dispatch({ type: LOADING, payload: { loading: false } });
          dispatch({ type: IS_USER_AUTH, payload: { isAuth: false } });
        }
      );
    } catch (e) {
      dispatch({ type: LOGOUT_REJECTED, payload: { error: e } });
    }
  };

export const fetchRefreshTokenThunk =
  (fetchCallback: () => void) =>
  async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: REFRESH_TOKEN_REQUEST });

    try {
      await refreshToken(localStorage.getItem('refreshToken')!).then(
        (response: Response) => {
          dispatch({ type: REFRESH_TOKEN, payload: response });
          setCookie('accessToken', response.accessToken!);
          localStorage.setItem('refreshToken', response.refreshToken!);

          fetchCallback();
        }
      );
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch(fetchLogoutThunk() as unknown as UnknownAction);
        dispatch({ type: CHECKING_AUTH, payload: { checkingAuth: true } });
      }
      dispatch({ type: REFRESH_TOKEN_REJECTED, payload: e });
    }
  };

export const checkUserAuthThunk = () => {
  return (dispatch: (action: ActionType) => void) => {
    if (localStorage.getItem('refreshToken')) {
      dispatch(fetchUserThunk() as unknown as UnknownAction);
      dispatch({ type: CHECKING_AUTH, payload: { checkingAuth: true } });
    } else {
      dispatch({ type: CHECKING_AUTH, payload: { checkingAuth: true } });
      dispatch({ type: LOADING, payload: { loading: false } });
      dispatch({ type: IS_USER_AUTH, payload: { isAuth: false } });
    }
  };
};
