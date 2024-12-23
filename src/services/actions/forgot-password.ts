import { rememberPassword } from '../../shared/api/data.service';
import {
  FORGOT_PASSWORD_REJECTED,
  FORGOT_PASSWORD_REQUEST,
  SENDING_EMAIL
} from '../constants';
import { Response } from '../../shared/models/response.type';
import { AppDispatch, AppThunkAction } from '../types';

export interface ISendingEmail {
  readonly type: typeof SENDING_EMAIL;
  response: Response;
}
export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
  email: string;
}
export interface IForgotPasswordRejected {
  readonly type: typeof FORGOT_PASSWORD_REJECTED;
  error: unknown;
}
export type TForgotPasswordActions =
  | ISendingEmail
  | IForgotPasswordRequest
  | IForgotPasswordRejected;

export const fetchForgotPasswordThunk: AppThunkAction =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch(makeRequestOfForgotPassword(email));

    try {
      await rememberPassword(email).then(response =>
        dispatch(sendEmail(response))
      );
    } catch (e) {
      dispatch(catchErrorOfForgotPassword(e));
    }
  };

export const sendEmail = (response: Response): ISendingEmail => ({
  type: SENDING_EMAIL,
  response
});
export const makeRequestOfForgotPassword = (
  email: string
): IForgotPasswordRequest => ({
  type: FORGOT_PASSWORD_REQUEST,
  email
});
export const catchErrorOfForgotPassword = (
  error: unknown
): IForgotPasswordRejected => ({
  type: FORGOT_PASSWORD_REJECTED,
  error
});
