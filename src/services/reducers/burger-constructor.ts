import {
  AMOUNT_RECALCULATING,
  BUN_ADDING,
  BURGER_CONSTRUCTOR_GETTING,
  INGREDIENT_ADDING,
  INGREDIENT_MOVING,
  INGREDIENT_REMOVING,
  MAKING_ORDER,
  ORDER_MAKING_REJECTED,
  ORDER_MAKING_REQUEST
} from '../actions/burger-constructor';
import { ActionType } from '../../shared/models/action.type';

const initialState = {
  burgerConstructor: [],
  buns: {},
  ingredient: {},
  amount: 0,
  order: {},
  error: null
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
        amount: action.payload
      };
    }
    case MAKING_ORDER: {
      return {
        ...state,
        order: action.payload
      };
    }
    case ORDER_MAKING_REJECTED: {
      return {
        ...state,
        order: [],
        error: action.payload
      };
    }
    case ORDER_MAKING_REQUEST: {
      return {
        ...state,
        order: [],
        error: null
      };
    }
    case INGREDIENT_REMOVING: {
      return {
        ...state,
        burgerConstructor: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
