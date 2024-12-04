import { feedsReducer } from './feeds';
import { getFeedsActions, TFeedActions } from '../actions/feeds';
import { Feed, FeedDetail } from '../../shared/models/feed.type';
import { Status } from '../../shared/consts/status.enum';
import { v4 } from 'uuid';

const _id = v4();

const orderTest: FeedDetail = {
  _id,
  status: Status.Done,
  number: 'string;',
  name: 'string;',
  ingredients: [],
  createdAt: new Date(),
  updatedAt: new Date()
};
const feedTest: Feed = {
  orders: [orderTest],
  success: true,
  total: 2,
  totalToday: 1
};
const initialState = {
  feeds: undefined,
  error: null
};

describe('Feeds Reducer', () => {
  it('should return the initial state', () => {
    expect(feedsReducer(initialState, {} as TFeedActions)).toEqual({
      ...initialState
    });
  });

  it('should get feeds', () => {
    expect(feedsReducer(initialState, getFeedsActions(feedTest))).toEqual({
      ...initialState,
      feeds: [feedTest]
    });
  });
});
