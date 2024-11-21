import { TWSAction } from '../../shared/models/ws-action.type';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from '../constants';

type TWSState = {
  wsConnected: boolean;
  error?: Event;
  messages?: never[];
};

const initialState: TWSState = {
  wsConnected: false
};

export const wsReducer = (
  state = initialState,
  action: TWSAction
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: []
      };

    default:
      return state;
  }
};
