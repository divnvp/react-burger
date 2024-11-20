// список всех ингредиентов в текущем конструкторе бургера
import { ActionType } from '../../shared/models/action.type';
import { makeOrder } from '../../shared/api/data.service';
import {
  MAKING_ORDER,
  ORDER_MAKING_REJECTED,
  ORDER_MAKING_REQUEST
} from '../constants';

export const fetchMakingOrderThunk =
  (order: string[]) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: ORDER_MAKING_REQUEST });

    try {
      await makeOrder(order).then(data =>
        dispatch({
          type: MAKING_ORDER,
          payload: { order: data }
        })
      );
    } catch (e) {
      dispatch({ type: ORDER_MAKING_REJECTED, payload: { error: e } });
    }
  };
