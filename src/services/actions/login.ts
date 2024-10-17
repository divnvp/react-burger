import { RegisterUser } from '../../shared/models/register-user.type';
import { ActionType } from '../../shared/models/action.type';
import { loginUser } from '../../shared/api/auth.service';
import { USER_GETTING } from './user';
import { setCookie } from '../../shared/utils/set-cookie';
import { Response } from '../../shared/models/response.type';

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const fetchLoginThunk =
  (credits: RegisterUser) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      await loginUser(credits).then((response: Response) => {
        setCookie('accessToken', response.accessToken!);
        localStorage.setItem('refreshToken', response.refreshToken!);

        dispatch({ type: LOGIN, payload: response });
        dispatch({ type: USER_GETTING, payload: response });
      });
    } catch (e) {
      dispatch({ type: LOGIN_REJECTED });
    }
  };
