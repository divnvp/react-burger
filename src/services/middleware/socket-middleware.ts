import { Middleware, MiddlewareAPI } from 'redux';
import { AppActions, AppDispatch, RootState } from '../types';
import { getFeedsActions } from '../actions/feeds';
import { closeConnection } from '../actions/ws';
import { TWSStoreActions } from '../../shared/models/ws-store-actions.type';

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWSStoreActions
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch } = store;

      if ('payload' in action) {
        socket = new WebSocket(`${wsUrl}${action.payload}`);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          console.log('Socket opened');
        };

        socket.onmessage = (event: MessageEvent) => {
          console.log(`Получены данные: ${event.data}`);
          dispatch(getFeedsActions(event.data));
        };

        socket.onerror = () => {
          dispatch(closeConnection());
        };

        socket.onclose = (event: Event) => {
          dispatch(closeConnection());
        };
      }

      next(action);
    };
  }) as Middleware;
};
