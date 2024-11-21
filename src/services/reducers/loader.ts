import { ActionType } from '../../shared/models/action.type';
import { LOADING } from '../constants';

type TLoaderState = {
  loading?: boolean;
};

const initialState: TLoaderState = {
  loading: true
};

export const loaderReducer = (
  state = initialState,
  action: ActionType
): TLoaderState => {
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
