import { ActionType } from '../../shared/models/action.type';
import { FEEDS, FEEDS_REJECTED, FEEDS_REQUEST } from '../constants';
import { Feed } from '../../shared/models/feed.type';

type TFeedState = {
  feeds?: Feed;
  error: unknown;
};

const initialState: TFeedState = {
  feeds: undefined,
  error: null
};

export const feedsReducer = (
  state = initialState,
  action: ActionType
): TFeedState => {
  switch (action.type) {
    case FEEDS: {
      return {
        ...state,
        feeds: action.payload?.feeds
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
