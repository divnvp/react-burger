import { ActionType } from '../../shared/models/action.type';

export const FEEDS = 'FEEDS';
export const FEEDS_REQUEST = 'FEEDS_REQUEST';
export const FEEDS_REJECTED = 'FEEDS_REJECTED';

export const fetchFeedsThunk =
  () => (dispatch: (action: ActionType) => void) => {};
