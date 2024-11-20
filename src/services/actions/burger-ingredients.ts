//список всех полученных ингредиентов
import { getData } from '../../shared/api/data.service';
import { ActionType } from '../../shared/models/action.type';
import {
  INGREDIENTS_GETTING,
  INGREDIENTS_GETTING_REJECTED,
  INGREDIENTS_GETTING_REQUEST
} from '../constants';
import { Ingredient } from '../../shared/models/ingredient.type';

export interface IGetIngredients {
  readonly type: typeof INGREDIENTS_GETTING;
  ingredients: Ingredient[];
}
export interface IRequestOfIngredientGetting {
  readonly type: typeof INGREDIENTS_GETTING_REQUEST;
}
export interface IRejectedOfIngredientGetting {
  readonly type: typeof INGREDIENTS_GETTING_REJECTED;
  error: unknown;
}
export type TBurgerIngredientsActions =
  | IGetIngredients
  | IRequestOfIngredientGetting;

export const fetchIngredientsThunk =
  () => async (dispatch: (action: ActionType) => void) => {
    dispatch(makeRequestOfIngredients());

    try {
      await getData().then(ingredients =>
        dispatch(getIngredients(ingredients.data))
      );
    } catch (e) {
      dispatch(getErrorOfIngredients(e));
    }
  };

export const getIngredients = (ingredients: Ingredient[]): IGetIngredients => ({
  type: INGREDIENTS_GETTING,
  ingredients
});

export const makeRequestOfIngredients = (): IRequestOfIngredientGetting => ({
  type: INGREDIENTS_GETTING_REQUEST
});

export const getErrorOfIngredients = (
  error: unknown
): IRejectedOfIngredientGetting => ({
  type: INGREDIENTS_GETTING_REJECTED,
  error
});
