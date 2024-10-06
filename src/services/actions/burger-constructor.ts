// список всех ингредиентов в текущем конструкторе бургера
import { ActionType } from '../../shared/models/action.type';
import { makeOrder } from '../../shared/api/data.service';

export const BURGER_CONSTRUCTOR_GETTING = 'BURGER_CONSTRUCTOR_GETTING';
export const INGREDIENT_ADDING = 'INGREDIENT_ADDING';
export const BUN_ADDING = 'BUN_ADDING';
export const INGREDIENT_REMOVING = 'INGREDIENT_REMOVING';
export const AMOUNT_RECALCULATING = 'AMOUNT_RECALCULATING';
export const INGREDIENT_MOVING = 'INGREDIENT_MOVING';
export const MAKING_ORDER = 'MAKING_ORDER';

export const ORDER_MAKING_REJECTED = 'ORDER_MAKING_REJECTED';
export const ORDER_MAKING_REQUEST = 'ORDER_MAKING_REQUEST';

export const fetchMakingOrderThunk =
  (order: string[]) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: ORDER_MAKING_REQUEST });

    try {
      const data = await makeOrder(order);
      dispatch({
        type: MAKING_ORDER,
        payload: data
      });
    } catch (e) {
      dispatch({ type: ORDER_MAKING_REJECTED, payload: e });
    }
  };
