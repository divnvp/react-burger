import { RegisterUser } from '../../shared/models/register-user.type';
import { ActionType } from '../../shared/models/action.type';
import { registerUser } from '../../shared/api/auth.service';
import { setCookie } from '../../shared/utils/set-cookie';
import {
  REGISTRATION,
  REGISTRATION_REJECTED,
  REGISTRATION_REQUEST
} from '../constants';

export const fetchRegisterThunk =
  (credits: RegisterUser) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: REGISTRATION_REQUEST });

    try {
      await registerUser(credits).then(response => {
        setCookie('accessToken', response.accessToken!);
        localStorage.setItem('refreshToken', response.refreshToken);

        dispatch({ type: REGISTRATION, payload: response });
      });
    } catch (e) {
      dispatch({ type: REGISTRATION_REJECTED });
    }
  };
