import { RegisterUser } from '../../shared/models/register-user.type';
import { ActionType } from '../../shared/models/action.type';
import { loginUser, logout, refreshToken } from '../../shared/api/auth.service';
import { setCookie } from '../../shared/utils/set-cookie';
import { Response } from '../../shared/models/response.type';
import { UnknownAction } from 'redux';
import { fetchUserThunk } from './user';

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REJECTED = 'LOGOUT_REJECTED';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_REJECTED = 'REFRESH_TOKEN_REJECTED';

export const CHECKING_AUTH = 'CHECKING_AUTH';

export const fetchLoginThunk =
  (credits: RegisterUser) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      await loginUser(credits).then((response: Response) => {
        setCookie('accessToken', response.accessToken!);
        localStorage.setItem('refreshToken', response.refreshToken!);

        dispatch({ type: LOGIN, payload: response });
        dispatch({ type: CHECKING_AUTH, payload: true });
      });
    } catch (e) {
      dispatch({ type: LOGIN_REJECTED, payload: e });
      dispatch({ type: CHECKING_AUTH, payload: false });
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
          dispatch({ type: CHECKING_AUTH, payload: false });
        }
      );
    } catch (e) {
      dispatch({ type: LOGOUT_REJECTED, payload: e });
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
        dispatch({ type: CHECKING_AUTH, payload: false });
      }
      dispatch({ type: REFRESH_TOKEN_REJECTED, payload: e });
    }
  };

export const checkUserAuthThunk = () => {
  return (dispatch: (action: ActionType) => void) => {
    if (localStorage.getItem('refreshToken')) {
      dispatch(fetchUserThunk() as unknown as UnknownAction);
      dispatch({ type: CHECKING_AUTH, payload: true });
    } else {
      dispatch({ type: CHECKING_AUTH, payload: false });
    }
  };
};
