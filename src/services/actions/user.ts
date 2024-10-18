import { ActionType } from '../../shared/models/action.type';
import { getUser } from '../../shared/api/user.service';

export const USER_GETTING = 'USER_GETTING';
export const USER_REQUEST = 'USER_REQUEST';
export const USER_REJECTED = 'USER_REJECTED';

export const fetchUserThunk =
  () => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: USER_REQUEST });

    try {
      await getUser().then(response => {
        dispatch({ type: USER_GETTING, payload: response.user });
      });
    } catch (e) {
      dispatch({ type: USER_REJECTED, payload: e });
    }
  };
