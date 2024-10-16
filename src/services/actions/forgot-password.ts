import { rememberPassword } from '../../shared/api/data.service';
import { ActionType } from '../../shared/models/action.type';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_REJECTED = 'FORGOT_PASSWORD_REJECTED';
export const SENDING_EMAIL = 'SENDING_EMAIL';

export const fetchForgotPasswordThunk =
  (email: string) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    try {
      const response = await rememberPassword(email);
      dispatch({ type: SENDING_EMAIL, payload: response });
    } catch (e) {
      dispatch({ type: FORGOT_PASSWORD_REJECTED, payload: e });
    }
  };
