// список всех ингредиентов в текущем конструкторе бургера
import { ActionType } from '../../shared/models/action.type';
import { makeOrder } from '../../shared/api/data.service';
import {
  AMOUNT_RECALCULATING,
  BUN_ADDING,
  BURGER_CONSTRUCTOR_GETTING,
  CLEAR_ORDER,
  INGREDIENT_ADDING,
  INGREDIENT_MOVING,
  INGREDIENT_REMOVING,
  MAKING_ORDER,
  ORDER_MAKING_REJECTED,
  ORDER_MAKING_REQUEST
} from '../constants';
import { Order } from '../../shared/models/order.type';
import { Ingredient } from '../../shared/models/ingredient.type';

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
export interface IBunAdding {
  readonly type: typeof BUN_ADDING;
  bun: Ingredient;
}
export interface IIngredientAdding {
  readonly type: typeof INGREDIENT_ADDING;
  ingredient: Ingredient;
}
export interface IIngredientMoving {
  readonly type: typeof INGREDIENT_MOVING;
  burgerConstructor: Ingredient[];
}
export interface IAmountRecalculation {
  readonly type: typeof AMOUNT_RECALCULATING;
  amount?: number;
}
export interface IClearOrder {
  readonly type: typeof CLEAR_ORDER;
}
export interface IIngredientRemoving {
  readonly type: typeof INGREDIENT_REMOVING;
  burgerConstructor: Ingredient[];
}
export interface IBurgerConstructorGetting {
  readonly type: typeof BURGER_CONSTRUCTOR_GETTING;
}

export type TBurgerConstructorActions =
  | IMakingOrder
  | IRequestMakingOrder
  | IBunAdding
  | IIngredientAdding
  | IIngredientMoving
  | IClearOrder
  | IAmountRecalculation
  | IIngredientRemoving
  | IBurgerConstructorGetting
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

export const makeRequest = (): IRequestMakingOrder => ({
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
export const addBun = (bun: Ingredient): IBunAdding => ({
  type: BUN_ADDING,
  bun
});
export const addIngredient = (ingredient: Ingredient): IIngredientAdding => ({
  type: INGREDIENT_ADDING,
  ingredient
});
export const moveIngredientAction = (
  burgerConstructor: Ingredient[]
): IIngredientMoving => ({
  type: INGREDIENT_MOVING,
  burgerConstructor
});
export const recalculateAmountAction = (
  amount?: number
): IAmountRecalculation => ({
  type: AMOUNT_RECALCULATING,
  amount
});
export const clearOrderAction = (): IClearOrder => ({
  type: CLEAR_ORDER
});
export const removeIngredientAction = (
  burgerConstructor: Ingredient[]
): IIngredientRemoving => ({
  type: INGREDIENT_REMOVING,
  burgerConstructor
});
export const getOfBurgerConstructorAction = (): IBurgerConstructorGetting => ({
  type: BURGER_CONSTRUCTOR_GETTING
});
