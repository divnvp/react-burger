import { rememberPassword } from '../../shared/api/data.service';
import { ActionType } from '../../shared/models/action.type';
import {
  FORGOT_PASSWORD_REJECTED,
  FORGOT_PASSWORD_REQUEST,
  SENDING_EMAIL
} from '../constants';

export const fetchForgotPasswordThunk =
  (email: string) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST, payload: { email } });

    try {
      const response = await rememberPassword(email);
      dispatch({ type: SENDING_EMAIL, payload: response });
    } catch (e) {
      dispatch({ type: FORGOT_PASSWORD_REJECTED, payload: { error: e } });
    }
  };
