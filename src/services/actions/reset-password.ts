import { ActionType } from '../../shared/models/action.type';
import { resetPassword } from '../../shared/api/data.service';
import { ResetPassword } from '../../shared/models/reset-password.type';
import {
  RESET_PASSWORD_REJECTED,
  RESET_PASSWORD_REQUEST,
  RESETTING_PASSWORD
} from '../constants';
import { Response } from '../../shared/models/response.type';

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResettingPassword {
  readonly type: typeof RESETTING_PASSWORD;
  response: Response;
}
export interface IResetPasswordRejected {
  readonly type: typeof RESET_PASSWORD_REJECTED;
  error: unknown;
}
export type TResetPasswordAction =
  | IResetPasswordRequest
  | IResettingPassword
  | IResetPasswordRejected;

export const fetchResetPasswordThunk =
  (credits: ResetPassword) =>
  async (dispatch: (action: ActionType) => void) => {
    dispatch(makeResetPasswordRequest());

    try {
      const response = await resetPassword(credits);
      dispatch(makeResetPassword(response));
    } catch (e) {
      dispatch(catchResetPasswordThunk(e));
    }
  };

export const makeResetPasswordRequest = (): IResetPasswordRequest => ({
  type: RESET_PASSWORD_REQUEST
});
export const makeResetPassword = (response: Response): IResettingPassword => ({
  type: RESETTING_PASSWORD,
  response
});
export const catchResetPasswordThunk = (
  error: unknown
): IResetPasswordRejected => ({
  type: RESET_PASSWORD_REJECTED,
  error
});
