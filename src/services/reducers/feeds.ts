import { ActionType } from '../../shared/models/action.type';
import { FEEDS, FEEDS_REJECTED, FEEDS_REQUEST } from '../actions/feeds';

const initialState = {
  feeds: [],
  error: null
};

export const feedsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FEEDS: {
      return {
        ...state,
        feeds: action.payload
      };
    }
    case FEEDS_REQUEST: {
      return {
        ...state,
        error: null
      };
    }
    case FEEDS_REJECTED: {
      return {
        ...state,
        error: action.payload?.error
      };
    }
    default:
      return state;
  }
};
