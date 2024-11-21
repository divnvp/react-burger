import { ActionType } from '../../shared/models/action.type';
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
import { Ingredient } from '../../shared/models/ingredient.type';
import { Order } from '../../shared/models/order.type';

type TBurgerConstructorState = {
  burgerConstructor: Ingredient[];
  buns?: Ingredient;
  ingredient?: Ingredient;
  amount?: number;
  order?: Order;
  error: unknown;
  loading: boolean;
};

const initialState: TBurgerConstructorState = {
  burgerConstructor: [],
  amount: 0,
  error: null,
  loading: false
};

export const burgerConstructorReducer = (
  state = initialState,
  action: ActionType
): TBurgerConstructorState => {
  switch (action.type) {
    case BURGER_CONSTRUCTOR_GETTING: {
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor]
      };
    }
    case BUN_ADDING: {
      return {
        ...state,
        buns: action?.bun
      };
    }
    case INGREDIENT_ADDING: {
      return {
        ...state,
        burgerConstructor: [
          ...state.burgerConstructor,
          action.ingredient
        ] as Ingredient[]
      };
    }
    case INGREDIENT_MOVING: {
      return {
        ...state,
        burgerConstructor: action?.burgerConstructor as Ingredient[]
      };
    }
    case AMOUNT_RECALCULATING: {
      return {
        ...state,
        amount: action?.amount
      };
    }
    case MAKING_ORDER: {
      return {
        ...state,
        order: action?.order,
        loading: false
      };
    }
    case ORDER_MAKING_REJECTED: {
      return {
        ...state,
        order: undefined,
        error: action?.error,
        loading: false
      };
    }
    case ORDER_MAKING_REQUEST: {
      return {
        ...state,
        order: undefined,
        error: null,
        loading: true
      };
    }
    case INGREDIENT_REMOVING: {
      return {
        ...state,
        burgerConstructor: action?.burgerConstructor as Ingredient[]
      };
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        burgerConstructor: [],
        buns: undefined
      };
    }
    default: {
      return state;
    }
  }
};
