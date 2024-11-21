import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from '../constants';
import { IWSConnectionStart } from '../../shared/models/ws-action.type';

export interface IWsInit {
  readonly type: typeof WS_CONNECTION_START;
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
  | IWsConnectionError;

export const initWs = (): IWSConnectionStart => ({
  type: WS_CONNECTION_START
});
export const sendMessageWithWs = (): IWsSendMessage => ({
  type: WS_SEND_MESSAGE
});
export const checkSuccessConnection = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS
});
export const checkClosedConnection = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED
});
export const getMessageWithWs = (): IWsGetMessage => ({
  type: WS_GET_MESSAGE
});
