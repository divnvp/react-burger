import { ActionType } from '../../shared/models/action.type';
import { getUser, updateUser } from '../../shared/api/user.service';
import { Response } from '../../shared/models/response.type';
import { fetchRefreshTokenThunk } from './login';
import { UnknownAction } from 'redux';
import { RegisterUser } from '../../shared/models/register-user.type';
import {
  CHECKING_AUTH,
  IS_USER_AUTH,
  USER_GETTING,
  USER_REJECTED,
  USER_REQUEST,
  USER_UPDATING,
  USER_UPDATING_REJECTED,
  USER_UPDATING_REQUEST
} from '../constants';

export const fetchUserThunk =
  () => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: USER_REQUEST });

    try {
      await getUser().then((response: Response) => {
        dispatch({ type: USER_GETTING, payload: response.user });
        dispatch({ type: CHECKING_AUTH, payload: { checkingAuth: true } });
        dispatch({ type: IS_USER_AUTH, payload: { isAuth: true } });
      });
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch({ type: IS_USER_AUTH, payload: { isAuth: false } });
        dispatch({ type: CHECKING_AUTH, payload: { checkingAuth: true } });
        dispatch(
          fetchRefreshTokenThunk(() =>
            dispatch(fetchUserThunk() as unknown as UnknownAction)
          ) as unknown as UnknownAction
        );
      } else {
        dispatch({ type: USER_REJECTED, payload: e });
      }
    }
  };

export const fetchUserUpdatingThunk =
  (credits: RegisterUser) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: USER_UPDATING_REQUEST });

    try {
      await updateUser(credits).then((response: Response) => {
        dispatch({ type: USER_GETTING, payload: response.user });
        dispatch({ type: USER_UPDATING, payload: response });
      });
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch({ type: CHECKING_AUTH, payload: { checkingAuth: true } });
        dispatch(
          fetchRefreshTokenThunk(() =>
            dispatch(
              fetchUserUpdatingThunk(credits) as unknown as UnknownAction
            )
          ) as unknown as UnknownAction
        );
      } else {
        dispatch({ type: USER_UPDATING_REJECTED, payload: { error: e } });
      }
    }
  };
