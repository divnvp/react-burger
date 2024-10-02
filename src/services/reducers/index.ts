import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailsReducer } from './ingredient-details';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredient: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer
});
