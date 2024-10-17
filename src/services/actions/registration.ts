import { RegisterUser } from '../../shared/models/register-user.type';
import { ActionType } from '../../shared/models/action.type';
import { registerUser } from '../../shared/api/auth.service';
import { USER_GETTING } from './user';

export const REGISTRATION = 'REGISTRATION';
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_REJECTED = 'REGISTRATION_REJECTED';

export const fetchRegisterThunk =
  (credits: RegisterUser) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: REGISTRATION_REQUEST });

    try {
      const response = await registerUser(credits);
      dispatch({ type: REGISTRATION, payload: response });
      dispatch({ type: USER_GETTING, payload: response });
    } catch (e) {
      dispatch({ type: REGISTRATION_REJECTED });
    }
  };
