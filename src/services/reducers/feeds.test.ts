import { feedsReducer, initialStateOfFeeds } from './feeds';
import {
  getFeedRejected,
  getFeedsActions,
  getFeedsRequest,
  TFeedActions
} from '../actions/feeds';
import { Feed } from '../../shared/models/feed.type';

const feedTest: Feed = {
  success: true,
  orders: [
    {
      _id: '674fe769e367de001daf69af',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-12-04T05:23:53.907Z',
      updatedAt: '2024-12-04T05:23:54.886Z',
      number: 61505
    },
    {
      _id: '674f8d5de367de001daf698a',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0940'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный метеоритный бургер',
      createdAt: '2024-12-03T22:59:41.488Z',
      updatedAt: '2024-12-03T22:59:42.482Z',
      number: 61504
    },
    {
      _id: '674f71c8e367de001daf694f',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-12-03T21:02:00.718Z',
      updatedAt: '2024-12-03T21:02:01.600Z',
      number: 61493
    }
  ],
  total: 61139,
  totalToday: 149
};

describe('Feeds Reducer', () => {
  it('should return the initial state', () => {
    expect(feedsReducer(initialStateOfFeeds, {} as TFeedActions)).toEqual({
      ...initialStateOfFeeds
    });
  });

  it('should get feeds', () => {
    expect(
      feedsReducer(
        initialStateOfFeeds,
        getFeedsActions(JSON.stringify({ feed: feedTest }) as unknown as Feed)
      )
    ).toEqual({
      ...initialStateOfFeeds,
      feeds: { feed: feedTest }
    });
  });

  it('should catch ingredients error', () => {
    expect(
      feedsReducer(initialStateOfFeeds, getFeedRejected({ error: 'lalala' }))
    ).toEqual({
      ...initialStateOfFeeds,
      error: { error: 'lalala' }
    });
  });

  it('should ingredients request', () => {
    expect(feedsReducer(initialStateOfFeeds, getFeedsRequest())).toEqual({
      ...initialStateOfFeeds,
      error: null
    });
  });
});
