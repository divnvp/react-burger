import { ActionType } from '../../shared/models/action.type';
import {
  CHECKING_AUTH,
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
  logout: null,
  checkingAuth: false
};

export const loginReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        logout: null,
        user: { ...action.payload?.user },
        success: true,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        checkingAuth: true
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
        error: action.payload?.error
      };
    }

    case LOGOUT: {
      return {
        ...state,
        logout: action.payload?.logout,
        checkingAuth: false
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
        error: action.payload?.error
      };
    }
    case CHECKING_AUTH: {
      return {
        ...state,
        checkingAuth: action.payload?.checkingAuth
      };
    }
    default: {
      return state;
    }
  }
};
