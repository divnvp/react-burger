// список всех ингредиентов в текущем конструкторе бургера
import { ActionType } from '../../shared/models/action.type';
import { makeOrder } from '../../shared/api/data.service';
import {
  MAKING_ORDER,
  ORDER_MAKING_REJECTED,
  ORDER_MAKING_REQUEST
} from '../constants';
import { Order } from '../../shared/models/order.type';

export interface IMakingOrder {
  readonly type: typeof MAKING_ORDER;
  order: Order;
}
export interface IRequestMakingOrder {
  readonly type: typeof ORDER_MAKING_REQUEST;
}
export interface IRejectMakingOrder {
  readonly type: typeof ORDER_MAKING_REJECTED;
  error: unknown;
}

export type TBurgerConstructorActions =
  | IMakingOrder
  | IRequestMakingOrder
  | IRejectMakingOrder;

export const fetchMakingOrderThunk =
  (order: string[]) => async (dispatch: (action: ActionType) => void) => {
    dispatch(makeRequest());

    try {
      await makeOrder(order).then(data => dispatch(getOrder(data)));
    } catch (e) {
      dispatch(getError(e));
    }
  };

export const makeRequest = () => ({
  type: ORDER_MAKING_REQUEST
});

export const getOrder = (order: Order): IMakingOrder => ({
  type: MAKING_ORDER,
  order
});

export const getError = (error: unknown): IRejectMakingOrder => ({
  type: ORDER_MAKING_REJECTED,
  error
});
