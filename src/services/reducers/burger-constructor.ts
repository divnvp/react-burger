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

const initialState = {
  burgerConstructor: [],
  buns: {},
  ingredient: {},
  amount: 0,
  order: {},
  error: null,
  loading: false
};

export const burgerConstructorReducer = (
  state = initialState,
  action: ActionType
) => {
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
        buns: action.payload
      };
    }
    case INGREDIENT_ADDING: {
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor, action.payload]
      };
    }
    case INGREDIENT_MOVING: {
      return {
        ...state,
        burgerConstructor: action.payload
      };
    }
    case AMOUNT_RECALCULATING: {
      return {
        ...state,
        amount: action.payload?.amount
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
        order: [],
        error: action?.error,
        loading: false
      };
    }
    case ORDER_MAKING_REQUEST: {
      return {
        ...state,
        order: [],
        error: null,
        loading: true
      };
    }
    case INGREDIENT_REMOVING: {
      return {
        ...state,
        burgerConstructor: action.payload?.burgerConstructor
      };
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        burgerConstructor: [],
        buns: null
      };
    }
    default: {
      return state;
    }
  }
};
