import { ActionType } from '../../shared/models/action.type';
import { LOADING } from '../constants';

const initialState = {
  loading: true
};

export const loaderReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: action.payload?.loading
      };
    }
    default: {
      return state;
    }
  }
};
