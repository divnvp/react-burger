import { Middleware, MiddlewareAPI } from 'redux';
import { AppActions, AppDispatch, RootState } from '../types';
import { WS_CONNECTION_START, WS_GET_USER_ORDERS } from '../constants';
import { getFeedsActions } from '../actions/feeds';
import { getCookie } from '../../shared/utils/get-cookie';
import { closeConnection } from '../actions/ws';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch } = store;

      if (action.type === WS_GET_USER_ORDERS) {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
          socket = new WebSocket(
            `${wsUrl}orders?token=${accessToken.split('Bearer ')[1]}`
          );
        }
      } else if (action.type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}orders/all`);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          console.log('Socket opened');
        };

        socket.onmessage = (event: MessageEvent) => {
          console.log(`Получены данные: ${event.data}`);
          dispatch(getFeedsActions(event.data));
        };

        socket.onclose = (event: Event) => {
          dispatch(closeConnection());
        };
      }

      next(action);
    };
  }) as Middleware;
};
