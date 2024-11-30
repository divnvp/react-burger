import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_USER_ORDERS,
  WS_SEND_MESSAGE
} from '../constants';

export interface IWsInit {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}
export interface IWsGetUserOrders {
  readonly type: typeof WS_GET_USER_ORDERS;
  readonly payload: string;
}
export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
}
export type TWsActions =
  | IWsInit
  | IWsSendMessage
  | IWsConnectionSuccess
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsGetUserOrders
  | IWsConnectionError;

export const initWs = (payload: string): IWsInit => ({
  type: WS_CONNECTION_START,
  payload
});
export const getUserOrders = (payload: string): IWsGetUserOrders => ({
  type: WS_GET_USER_ORDERS,
  payload
});
export const sendMessageWithWs = (): IWsSendMessage => ({
  type: WS_SEND_MESSAGE
});
export const checkSuccessConnection = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS
});
export const closeConnection = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED
});
export const getMessageWithWs = (): IWsGetMessage => ({
  type: WS_GET_MESSAGE
});
