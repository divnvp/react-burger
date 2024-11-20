import { ActionType } from '../../shared/models/action.type';
import {
  INGREDIENTS_GETTING,
  INGREDIENTS_GETTING_REJECTED,
  INGREDIENTS_GETTING_REQUEST
} from '../constants';

const initialState = {
  ingredients: [],
  error: null
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case INGREDIENTS_GETTING: {
      return {
        ...state,
        ingredients: action?.ingredients
      };
    }
    case INGREDIENTS_GETTING_REJECTED: {
      return {
        ...state,
        error: action?.error
      };
    }
    case INGREDIENTS_GETTING_REQUEST: {
      return {
        ...state,
        error: null
      };
    }
    default:
      return state;
  }
};
