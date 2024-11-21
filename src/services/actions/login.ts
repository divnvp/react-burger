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
import { LoginUser } from '../../shared/models/login-user.type';

export interface IMakeLoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}
export interface IGetLogin {
  readonly type: typeof LOGIN;
  response: Response;
}
export interface IGetUser {
  readonly type: typeof USER_GETTING;
  user: LoginUser;
}
export interface ICheckAuth {
  readonly type: typeof CHECKING_AUTH;
  checkingAuth: boolean;
}
export interface IIsUserAuth {
  readonly type: typeof IS_USER_AUTH;
  isAuth: boolean;
}
export interface ILoginRejected {
  readonly type: typeof LOGIN_REJECTED;
  error: unknown;
}
export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface IMakeLogout {
  readonly type: typeof LOGOUT;
  response: Response;
}
export interface ILoading {
  readonly type: typeof LOADING;
  loading: boolean;
}
export interface ILogoutRejected {
  readonly type: typeof LOGOUT_REJECTED;
  error: unknown;
}
export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenRejected {
  readonly type: typeof REFRESH_TOKEN_REJECTED;
  error: unknown;
}
export interface IRefreshToken {
  readonly type: typeof REFRESH_TOKEN;
  response: Response;
}
export type TLoginActions =
  | IMakeLoginRequest
  | IGetLogin
  | IGetUser
  | IIsUserAuth
  | ILoginRejected
  | ILogoutRequest
  | IMakeLogout
  | ILoading
  | ILogoutRejected
  | IRefreshTokenRequest
  | IRefreshTokenRejected
  | IRefreshToken
  | ICheckAuth;

export const fetchLoginThunk =
  (credits: RegisterUser) => async (dispatch: (action: ActionType) => void) => {
    dispatch(makeRequestOfLogin());

    try {
      await loginUser(credits).then((response: Response) => {
        setCookie('accessToken', response.accessToken!);
        localStorage.setItem('refreshToken', response.refreshToken!);

        dispatch(getLogin(response));
        dispatch(getUser(response.user!));
        dispatch(checkAuth(true));
        dispatch(isUserAuth(true));
      });
    } catch (e) {
      dispatch(catchLoginRejected(e));
      dispatch(checkAuth(true));
      dispatch(isUserAuth(false));
    }
  };

export const fetchLogoutThunk =
  () => async (dispatch: (action: ActionType) => void) => {
    dispatch(makeLoginRequest());

    try {
      await logout(localStorage.getItem('refreshToken')!).then(
        (response: Response) => {
          setCookie('accessToken', '');
          localStorage.removeItem('refreshToken');

          dispatch(makeLogout(response));
          dispatch(checkAuth(true));
          dispatch(getUser({ email: '', password: '', name: undefined }));
          dispatch(makeLoading(false));
          dispatch(isUserAuth(false));
        }
      );
    } catch (e) {
      dispatch(catchLogoutRejected(e));
    }
  };

export const fetchRefreshTokenThunk =
  (fetchCallback: () => void) =>
  async (dispatch: (action: ActionType) => void) => {
    dispatch(makeRefreshToken());

    try {
      await refreshToken(localStorage.getItem('refreshToken')!).then(
        (response: Response) => {
          dispatch(getRefreshToken(response));
          setCookie('accessToken', response.accessToken!);
          localStorage.setItem('refreshToken', response.refreshToken!);

          fetchCallback();
        }
      );
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch(fetchLogoutThunk() as unknown as UnknownAction);
        dispatch(checkAuth(true));
      }
      dispatch(catchRefreshTokenRejected(e));
    }
  };

export const checkUserAuthThunk = () => {
  return (dispatch: (action: ActionType) => void) => {
    if (localStorage.getItem('refreshToken')) {
      dispatch(fetchUserThunk() as unknown as UnknownAction);
      dispatch(checkAuth(true));
    } else {
      dispatch(checkAuth(true));
      dispatch(makeLoading(false));
      dispatch(isUserAuth(false));
    }
  };
};

export const makeRequestOfLogin = (): IMakeLoginRequest => ({
  type: LOGIN_REQUEST
});
export const getLogin = (response: Response): IGetLogin => ({
  type: LOGIN,
  response
});
export const getUser = (user: LoginUser): IGetUser => ({
  type: USER_GETTING,
  user
});
export const checkAuth = (checkingAuth: boolean): ICheckAuth => ({
  type: CHECKING_AUTH,
  checkingAuth
});
export const isUserAuth = (isAuth: boolean): IIsUserAuth => ({
  type: IS_USER_AUTH,
  isAuth
});
export const catchLoginRejected = (error: unknown): ILoginRejected => ({
  type: LOGIN_REJECTED,
  error
});
export const makeLoginRequest = (): ILogoutRequest => ({
  type: LOGOUT_REQUEST
});
export const makeLogout = (response: Response): IMakeLogout => ({
  type: LOGOUT,
  response
});
export const makeLoading = (loading: boolean): ILoading => ({
  type: LOADING,
  loading
});
export const catchLogoutRejected = (error: unknown): ILogoutRejected => ({
  type: LOGOUT_REJECTED,
  error
});
export const getRefreshToken = (response: Response): IRefreshToken => ({
  type: REFRESH_TOKEN,
  response
});
export const makeRefreshToken = (): IRefreshTokenRequest => ({
  type: REFRESH_TOKEN_REQUEST
});
export const catchRefreshTokenRejected = (
  error: unknown
): IRefreshTokenRejected => ({
  type: REFRESH_TOKEN_REJECTED,
  error
});
