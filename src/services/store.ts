import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers';
import { Reducer } from 'react';
import { composeWithDevTools } from '@redux-devtools/extension';
import { socketMiddleware } from './middleware';
import { thunk } from 'redux-thunk';
import { TWSStoreActions } from '../shared/models/ws-store-actions.type';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_USER_ORDERS,
  WS_SEND_MESSAGE
} from './constants';

const wsUrl = 'wss://norma.nomoreparties.space/';
const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsGetUserOrder: WS_GET_USER_ORDERS
};

const store = createStore(
  rootReducer as Reducer<any, any>,
  composeWithDevTools(
    applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
  )
);

export default store;
