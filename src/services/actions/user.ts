import { ActionType } from '../../shared/models/action.type';
import { getUser, updateUser } from '../../shared/api/user.service';
import { Response } from '../../shared/models/response.type';
import { checkAuth, fetchRefreshTokenThunk, isUserAuth } from './login';
import { UnknownAction } from 'redux';
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

export const fetchUserThunk =
  () => async (dispatch: (action: ActionType) => void) => {
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
        dispatch(
          fetchRefreshTokenThunk(() =>
            dispatch(fetchUserThunk() as unknown as UnknownAction)
          ) as unknown as UnknownAction
        );
      } else {
        dispatch(catchUserRequest(e));
      }
    }
  };

export const fetchUserUpdatingThunk =
  (credits: RegisterUser) => async (dispatch: (action: ActionType) => void) => {
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
            dispatch(
              fetchUserUpdatingThunk(credits) as unknown as UnknownAction
            )
          ) as unknown as UnknownAction
        );
      } else {
        dispatch(catchUserUpdating(e));
      }
    }
  };

export const makeUserGettingRequest = () => ({
  type: USER_REQUEST
});
export const getUserRequest = (user: LoginUser) => ({
  type: USER_GETTING,
  user
});
export const catchUserRequest = (error: unknown) => ({
  type: USER_REJECTED,
  error
});
export const makeUserUpdatingRequest = () => ({
  type: USER_UPDATING_REQUEST
});
export const makeUserUpdating = (response: Response) => ({
  type: USER_UPDATING,
  response
});
export const catchUserUpdating = (error: unknown) => ({
  type: USER_UPDATING_REJECTED,
  error
});
