import { ActionType } from '../../shared/models/action.type';
import { LOGIN, LOGIN_REJECTED, LOGIN_REQUEST } from '../actions/login';

const initialState = {
  error: null,
  accessToken: '',
  refreshToken: ''
};

export const loginReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        error: null
      };
    }
    case LOGIN_REJECTED: {
      return {
        ...state,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
