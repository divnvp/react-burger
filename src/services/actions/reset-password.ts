import { ActionType } from '../../shared/models/action.type';
import { resetPassword } from '../../shared/api/data.service';
import { ResetPassword } from '../../shared/models/reset-password.type';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_REJECTED = 'RESET_PASSWORD_REJECTED';
export const RESETTING_PASSWORD = 'RESETTING_PASSWORD';

export const fetchResetPasswordThunk =
  (credits: ResetPassword) =>
  async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    try {
      const response = await resetPassword(credits);
      dispatch({ type: RESETTING_PASSWORD, payload: response });
    } catch (e) {
      dispatch({ type: RESET_PASSWORD_REJECTED, payload: { error: e } });
    }
  };
