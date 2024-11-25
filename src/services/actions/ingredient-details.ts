// объект текущего просматриваемого ингредиента
import { INGREDIENT_DETAILS_GETTING } from '../constants';
import { Ingredient } from '../../shared/models/ingredient.type';

export interface IGettingIngredientDetails {
  readonly type: typeof INGREDIENT_DETAILS_GETTING;
  ingredient: Ingredient;
}
export type TIngredientDetailsActions = IGettingIngredientDetails;

export const getIngredientDetails = (
  ingredient: Ingredient
): IGettingIngredientDetails => ({
  type: INGREDIENT_DETAILS_GETTING,
  ingredient
});
