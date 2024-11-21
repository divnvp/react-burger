import { FEEDS, FEEDS_REJECTED, FEEDS_REQUEST } from '../constants';
import { Feed } from '../../shared/models/feed.type';

export interface IGetFeeds {
  readonly type: typeof FEEDS;
  feed: Feed;
}
export interface IGetFeedsRequest {
  readonly type: typeof FEEDS_REQUEST;
}
export interface IGetFeedsRejected {
  readonly type: typeof FEEDS_REJECTED;
  error: unknown;
}
export type TFeedActions = IGetFeeds | IGetFeedsRequest | IGetFeedsRejected;

export const getFeedsActions = (feed: Feed): IGetFeeds => ({
  type: FEEDS,
  feed
});
export const getFeedsRequest = (): IGetFeedsRequest => ({
  type: FEEDS_REQUEST
});
export const getFeedRejected = (error: unknown): IGetFeedsRejected => ({
  type: FEEDS_REJECTED,
  error
});
