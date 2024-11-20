import { ActionType } from '../../shared/models/action.type';
import { INGREDIENT_DETAILS_GETTING } from '../constants/ingredient-details';

const initialState = {
  ingredient: {}
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case INGREDIENT_DETAILS_GETTING: {
      return {
        ...state,
        ingredient: action.payload?.ingredient
      };
    }
    default: {
      return state;
    }
  }
};
