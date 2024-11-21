import { Middleware, MiddlewareAPI } from 'redux';
import { AppActions, AppDispatch, RootState } from '../types';
import { WS_CONNECTION_START } from '../constants';
import { getFeedsActions } from '../actions/feeds';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch } = store;

      if (action.type === WS_CONNECTION_START) {
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
      }

      next(action);
    };
  }) as Middleware;
};
