import {
  AMOUNT_RECALCULATING,
  BURGER_CONSTRUCTOR_GETTING,
  INGREDIENT_ADDING
} from '../actions/burger-constructor';
import { State } from '../../shared/models/state.type';
import { ActionType } from '../../shared/models/action.type';

const initialState = {
  burgerConstructor: [],
  ingredient: {},
  amount: 0
};

export const burgerConstructorReducer = (
  state = initialState,
  action: ActionType & State
) => {
  switch (action.type) {
    case BURGER_CONSTRUCTOR_GETTING: {
      return {
        ...state,
        cart: [...state.burgerConstructor, action.payload]
      };
    }
    case INGREDIENT_ADDING: {
      return {
        ...state,
        ingredient: action.ingredient
      };
    }
    case AMOUNT_RECALCULATING: {
      return {
        ...state,
        amount: action.amount
      };
    }
    default:
      return state;
  }
};
