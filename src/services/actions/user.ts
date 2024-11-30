import { getUser, updateUser } from '../../shared/api/user.service';
import { Response } from '../../shared/models/response.type';
import { checkAuth, fetchRefreshTokenThunk, isUserAuth } from './login';
import { RegisterUser } from '../../shared/models/register-user.type';
import {
  USER_GETTING,
  USER_REJECTED,
  USER_REQUEST,
  USER_UPDATING,
  USER_UPDATING_REJECTED,
  USER_UPDATING_REQUEST
} from '../constants';
import { LoginUser } from '../../shared/models/login-user.type';
import { AppDispatch, AppThunkAction } from '../types';

export interface IUserRequest {
  readonly type: typeof USER_REQUEST;
}
export interface IUserGetting {
  readonly type: typeof USER_GETTING;
  user: LoginUser;
}
export interface IUserRejected {
  readonly type: typeof USER_REJECTED;
  error: unknown;
}
export interface IUserUpdatingRequest {
  readonly type: typeof USER_UPDATING_REQUEST;
}
export interface IUserUpdating {
  readonly type: typeof USER_UPDATING;
  response: Response;
}
export interface IUserUpdatingRejected {
  readonly type: typeof USER_UPDATING_REJECTED;
  error: unknown;
}
export type TUserActions =
  | IUserRequest
  | IUserGetting
  | IUserRejected
  | IUserUpdating
  | IUserUpdatingRejected
  | IUserUpdatingRequest;

export const fetchUserThunk: AppThunkAction =
  () => async (dispatch: AppDispatch) => {
    dispatch(makeUserGettingRequest());

    try {
      await getUser().then((response: Response) => {
        dispatch(getUserRequest(response.user!));
        dispatch(checkAuth(true));
        dispatch(isUserAuth(true));
      });
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch(isUserAuth(false));
        dispatch(checkAuth(true));
        dispatch(fetchRefreshTokenThunk(() => dispatch(fetchUserThunk())));
      } else {
        dispatch(catchUserRequest(e));
      }
    }
  };

export const fetchUserUpdatingThunk: AppThunkAction =
  (credits: RegisterUser) => async (dispatch: AppDispatch) => {
    dispatch(makeUserUpdatingRequest());

    try {
      await updateUser(credits).then((response: Response) => {
        dispatch(getUserRequest(response.user!));
        dispatch(makeUserUpdating(response));
      });
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch(checkAuth(true));
        dispatch(
          fetchRefreshTokenThunk(() =>
            dispatch(fetchUserUpdatingThunk(credits))
          )
        );
      } else {
        dispatch(catchUserUpdating(e));
      }
    }
  };

export const makeUserGettingRequest = (): IUserRequest => ({
  type: USER_REQUEST
});
export const getUserRequest = (user: LoginUser): IUserGetting => ({
  type: USER_GETTING,
  user
});
export const catchUserRequest = (error: unknown): IUserRejected => ({
  type: USER_REJECTED,
  error
});
export const makeUserUpdatingRequest = (): IUserUpdatingRequest => ({
  type: USER_UPDATING_REQUEST
});
export const makeUserUpdating = (response: Response): IUserUpdating => ({
  type: USER_UPDATING,
  response
});
export const catchUserUpdating = (error: unknown): IUserUpdatingRejected => ({
  type: USER_UPDATING_REJECTED,
  error
});
