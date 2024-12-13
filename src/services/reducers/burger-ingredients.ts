import {
  INGREDIENTS_GETTING,
  INGREDIENTS_GETTING_REJECTED,
  INGREDIENTS_GETTING_REQUEST
} from '../constants';
import { Ingredient } from '../../shared/models/ingredient.type';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';

type TBurgerIngredientsState = {
  ingredients?: Ingredient[];
  error: unknown;
};

export const initialStateOfBurgerIngredients: TBurgerIngredientsState = {
  ingredients: [],
  error: null
};

export const burgerIngredientsReducer = (
  state = initialStateOfBurgerIngredients,
  action: TBurgerIngredientsActions
): TBurgerIngredientsState => {
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
