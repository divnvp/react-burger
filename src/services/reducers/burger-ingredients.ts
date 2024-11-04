import {
  INGREDIENTS_GETTING,
  INGREDIENTS_GETTING_REJECTED,
  INGREDIENTS_GETTING_REQUEST
} from '../actions/burger-ingredients';
import { ActionType } from '../../shared/models/action.type';

const initialState = {
  ingredients: [],
  error: null
};

type IngredientReducer = {
  payload: { data: unknown; error: unknown };
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: ActionType & IngredientReducer
) => {
  switch (action.type) {
    case INGREDIENTS_GETTING: {
      return {
        ...state,
        ingredients: action.payload.data
      };
    }
    case INGREDIENTS_GETTING_REJECTED: {
      return {
        ...state,
        error: action.payload.error
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
