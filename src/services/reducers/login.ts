import { ActionType } from '../../shared/models/action.type';
import {
  LOGIN,
  LOGIN_REJECTED,
  LOGIN_REQUEST,
  LOGOUT,
  LOGOUT_REJECTED,
  LOGOUT_REQUEST
} from '../actions/login';

const initialState = {
  error: null,
  accessToken: '',
  refreshToken: '',
  success: false,
  user: {
    email: '',
    name: ''
  },
  logout: null
};

export const loginReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        user: { ...action.payload.user },
        success: true,
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

    case LOGOUT: {
      return {
        ...state,
        logout: action.payload
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        error: null
      };
    }
    case LOGOUT_REJECTED: {
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
