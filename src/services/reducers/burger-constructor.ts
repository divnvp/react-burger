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
      console.log(state);
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor]
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
        burgerConstructor: action.payload.burgerConstructor
      };
    }
    case AMOUNT_RECALCULATING: {
      return {
        ...state,
        amount: action.payload.amount
      };
    }
    default: {
      return state;
    }
  }
};
