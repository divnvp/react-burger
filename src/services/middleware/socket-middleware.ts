import { Middleware, MiddlewareAPI } from 'redux';
import { AppActions, AppDispatch, RootState } from '../types';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      socket = new WebSocket(`${wsUrl}orders/all`);
      const { dispatch } = store;
      socket.onopen = (event: Event) => {
        console.log('Socket opened');
      };

      socket.onmessage = (event: MessageEvent) => {
        console.log(`Получены данные: ${event.data}`);
      };

      next(action);
    };
  }) as Middleware;
};
