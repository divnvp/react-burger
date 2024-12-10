import { wsReducer } from './ws';
import {
  catchConnectionError,
  checkSuccessConnection,
  closeConnection,
  getMessageWithWs,
  getUserOrders,
  initWs,
  TWsActions
} from '../actions/ws';
import { getCookie } from '../../shared/utils/get-cookie';

const initialState = {
  wsConnected: false
};

describe('WS reducer', () => {
  it('should return initial state', () => {
    expect(wsReducer(initialState, {} as TWsActions)).toEqual(initialState);
  });

  it('should init webSocket', () => {
    expect(wsReducer(initialState, initWs('orders/all'))).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false
    });
  });

  it('should success connect', () => {
    expect(wsReducer(initialState, checkSuccessConnection())).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true
    });
  });

  it('should get user orders', () => {
    expect(
      wsReducer(
        initialState,
        getUserOrders(
          `orders?token=${getCookie('accessToken')?.split('Bearer ')[1]}`
        )
      )
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true
    });
  });

  it('should catch connection error', () => {
    expect(
      wsReducer(
        initialState,
        catchConnectionError({
          error: 'error'
        })
      )
    ).toEqual({
      ...initialState,
      error: { error: 'error' }
    });
  });

  it('should make connection close', () => {
    expect(wsReducer(initialState, closeConnection())).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false
    });
  });

  it('should get message', () => {
    expect(wsReducer(initialState, getMessageWithWs())).toEqual({
      ...initialState,
      error: undefined,
      messages: []
    });
  });
});
