import { TWSStoreActions } from '../../shared/models/ws-store-actions.type';
import { Middleware, MiddlewareAPI } from 'redux';
import { AppActions, AppDispatch, RootState } from '../types';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions) => {
  // return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
  //   let socket: WebSocket | null = null;
  //
  //   return next => (action: AppActions) => {
  //     const { dispatch, getState } = store;
  //     const { type } = action;
  //     const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
  //       wsActions;
  //     const { user } = (getState() as { user: any }).user;
  // if (type === wsInit && user) {
  //   socket = new WebSocket(`${wsUrl}?token=${user.token}`);
  // }
  // if (socket) {
  //   socket.onopen = event => {
  //     dispatch({ type: onOpen, payload: event });
  //   };
  //
  //   socket.onerror = event => {
  //     dispatch({ type: onError, payload: event });
  //   };
  //
  //   socket.onmessage = event => {
  //     const { data } = event;
  //     const parsedData = JSON.parse(data);
  //     const { success, ...restParsedData } = parsedData;
  //
  //     dispatch({
  //       type: onMessage,
  //       payload: { ...restParsedData }
  //     });
  //   };
  //
  //   socket.onclose = event => {
  //     dispatch({ type: onClose, payload: event });
  //   };
  //
  //   if (type === wsSendMessage) {
  //     const payload = action.payload;
  //   }
  // }
  //     next(action);
  //   };
  // }) as Middleware;
};
