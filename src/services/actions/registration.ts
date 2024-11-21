import { RegisterUser } from '../../shared/models/register-user.type';
import { registerUser } from '../../shared/api/auth.service';
import { setCookie } from '../../shared/utils/set-cookie';
import {
  REGISTRATION,
  REGISTRATION_REJECTED,
  REGISTRATION_REQUEST
} from '../constants';
import { Response } from '../../shared/models/response.type';
import { AppDispatch, AppThunkAction } from '../types';

export interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}
export interface IGetRegistration {
  readonly type: typeof REGISTRATION;
  response: Response;
}
export interface IRegistrationRejected {
  readonly type: typeof REGISTRATION_REJECTED;
  error: unknown;
}
export type TRegistrationActions =
  | IRegistrationRequest
  | IGetRegistration
  | IRegistrationRejected;

export const fetchRegisterThunk: AppThunkAction =
  (credits: RegisterUser) => async (dispatch: AppDispatch) => {
    dispatch(makeRegistrationRequest());

    try {
      await registerUser(credits).then(response => {
        setCookie('accessToken', response.accessToken!);
        localStorage.setItem('refreshToken', response.refreshToken);

        dispatch(makeRegistration(response));
      });
    } catch (e) {
      dispatch(catchRegistrationRejected(e));
    }
  };

export const makeRegistrationRequest = (): IRegistrationRequest => ({
  type: REGISTRATION_REQUEST
});
export const makeRegistration = (response: Response) => ({
  type: REGISTRATION,
  response
});
export const catchRegistrationRejected = (
  error: unknown
): IRegistrationRejected => ({
  type: REGISTRATION_REJECTED,
  error
});
