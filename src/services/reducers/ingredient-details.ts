import { ActionType } from '../../shared/models/action.type';
import { INGREDIENT_DETAILS_GETTING } from '../constants';
import { Ingredient } from '../../shared/models/ingredient.type';

type TIngredientDetailsState = {
  ingredient?: Ingredient;
};

const initialState: TIngredientDetailsState = {
  ingredient: undefined
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: ActionType
): TIngredientDetailsState => {
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
