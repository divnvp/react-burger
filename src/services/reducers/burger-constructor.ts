import {
  AMOUNT_RECALCULATING,
  BUN_ADDING,
  BURGER_CONSTRUCTOR_GETTING,
  INGREDIENT_ADDING,
  INGREDIENT_MOVING
} from '../actions/burger-constructor';
import { ActionType } from '../../shared/models/action.type';

const initialState = {
  burgerConstructor: [],
  buns: {},
  ingredient: {},
  amount: 0
};

export const burgerConstructorReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case BURGER_CONSTRUCTOR_GETTING: {
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor, action.payload]
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
    default: {
      return state;
    }
  }
};
