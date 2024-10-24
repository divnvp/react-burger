import { ActionType } from '../../shared/models/action.type';
import { getUser, updateUser } from '../../shared/api/user.service';
import { Response } from '../../shared/models/response.type';
import { CHECKING_AUTH, fetchRefreshTokenThunk } from './login';
import { UnknownAction } from 'redux';
import { RegisterUser } from '../../shared/models/register-user.type';

export const USER_GETTING = 'USER_GETTING';
export const USER_REQUEST = 'USER_REQUEST';
export const USER_REJECTED = 'USER_REJECTED';

export const USER_UPDATING = 'USER_UPDATING';
export const USER_UPDATING_REQUEST = 'USER_UPDATING_REQUEST';
export const USER_UPDATING_REJECTED = 'USER_UPDATING_REJECTED';

export const IS_USER_AUTH = 'IS_USER_AUTH';

export const fetchUserThunk =
  () => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: USER_REQUEST });

    try {
      await getUser().then((response: Response) => {
        dispatch({ type: USER_GETTING, payload: response.user });
        dispatch({ type: CHECKING_AUTH, payload: true });
        dispatch({ type: IS_USER_AUTH, payload: true });
      });
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch({ type: IS_USER_AUTH, payload: false });
        dispatch({ type: CHECKING_AUTH, payload: true });
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
        dispatch({ type: USER_UPDATING, payload: response });
      });
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch({ type: CHECKING_AUTH, payload: true });
        dispatch(
          fetchRefreshTokenThunk(() =>
            dispatch(
              fetchUserUpdatingThunk(credits) as unknown as UnknownAction
            )
          ) as unknown as UnknownAction
        );
      } else {
        dispatch({ type: USER_UPDATING_REJECTED, payload: e });
      }
    }
  };
