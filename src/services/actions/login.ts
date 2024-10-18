import { RegisterUser } from '../../shared/models/register-user.type';
import { ActionType } from '../../shared/models/action.type';
import { loginUser, logout } from '../../shared/api/auth.service';
import { setCookie } from '../../shared/utils/set-cookie';
import { Response } from '../../shared/models/response.type';

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REJECTED = 'LOGOUT_REJECTED';

export const fetchLoginThunk =
  (credits: RegisterUser) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      await loginUser(credits).then((response: Response) => {
        setCookie('accessToken', response.accessToken!);
        localStorage.setItem('refreshToken', response.refreshToken!);

        dispatch({ type: LOGIN, payload: response });
      });
    } catch (e) {
      dispatch({ type: LOGIN_REJECTED, payload: e });
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
        }
      );
    } catch (e) {
      dispatch({ type: LOGOUT_REJECTED, payload: e });
    }
  };
