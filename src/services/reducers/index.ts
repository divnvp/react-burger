import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { registrationReducer } from './registration';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredient: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  registration: registrationReducer,
  user: userReducer
});
