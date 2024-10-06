import { INGREDIENTS_GETTING } from '../actions/burger-ingredients';
import { ActionType } from '../../shared/models/action.type';

const initialState = {
  ingredients: []
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: ActionType
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
