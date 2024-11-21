import store from '../store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TForgotPasswordActions } from '../actions/forgot-password';
import { TLoginActions } from '../actions/login';
import { TRegistrationActions } from '../actions/registration';
import { TResetPasswordAction } from '../actions/reset-password';
import { TUserActions } from '../actions/user';
import { Action, ActionCreator } from 'redux';
import { TFeedActions } from '../actions/feeds';
import { TWsActions } from '../actions/ws';

export type AppActions =
  | TBurgerIngredientsActions
  | TBurgerConstructorActions
  | TForgotPasswordActions
  | TLoginActions
  | TRegistrationActions
  | TResetPasswordAction
  | TUserActions
  | TWsActions
  | TFeedActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, AppActions>
>;
