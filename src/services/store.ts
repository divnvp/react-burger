import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers';
import { Reducer } from 'react';
import { thunk } from 'redux-thunk';

const store = createStore(
  rootReducer as Reducer<unknown, unknown>,
  applyMiddleware(thunk)
);

export default store;
