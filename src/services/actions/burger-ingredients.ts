//список всех полученных ингредиентов
import { getData } from '../../shared/api/data.service';
import { ActionType } from '../../shared/models/action.type';

export const INGREDIENTS_GETTING_REQUEST = 'INGREDIENTS_GETTING_REQUEST';
export const INGREDIENTS_GETTING_REJECTED = 'INGREDIENTS_GETTING_REJECTED';
export const INGREDIENTS_GETTING = 'INGREDIENTS_GETTING';

export const fetchIngredientsThunk =
  () => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: INGREDIENTS_GETTING_REQUEST });

    try {
      const data = await getData();
      dispatch({
        type: INGREDIENTS_GETTING,
        payload: data
      });
    } catch (e) {
      dispatch({ type: INGREDIENTS_GETTING_REJECTED, payload: { error: e } });
    }
  };
