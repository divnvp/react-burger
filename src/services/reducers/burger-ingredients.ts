import { INGREDIENTS_GETTING } from '../actions/burger-ingredients';
import { State } from '../../shared/models/state.type';
import { ActionType } from '../../shared/models/action.type';

const initialState = {
  ingredients: []
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: ActionType & State
) => {
  switch (action.type) {
    case INGREDIENTS_GETTING: {
      return {
        ...state,
        ingredients: action.payload.data
      };
    }
    default:
      return state;
  }
};
