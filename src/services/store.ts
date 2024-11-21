import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers';
import { Reducer } from 'react';
import { composeWithDevTools } from '@redux-devtools/extension';
import { socketMiddleware } from './middleware';
import { thunk } from 'redux-thunk';

const wsUrl = 'wss://norma.nomoreparties.space/';

const store = createStore(
  rootReducer as Reducer<unknown, unknown>,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl)))
);

export default store;
