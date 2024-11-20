import { ActionType } from '../../shared/models/action.type';
import {
  CHECKING_AUTH,
  LOGIN,
  LOGIN_REJECTED,
  LOGIN_REQUEST,
  LOGOUT,
  LOGOUT_REJECTED,
  LOGOUT_REQUEST
} from '../constants';

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
      console.log(action);
      return {
        ...state,
        logout: null,
        user: { ...action.response?.user },
        success: true,
        accessToken: action.response?.accessToken,
        refreshToken: action.response?.refreshToken,
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
      console.log(action);
      return {
        ...state,
        error: action?.error
      };
    }

    case LOGOUT: {
      console.log(action);
      return {
        ...state,
        logout: action?.logout,
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
        error: action?.error
      };
    }
    case CHECKING_AUTH: {
      console.log(action);
      return {
        ...state,
        checkingAuth: action?.checkingAuth
      };
    }
    default: {
      return state;
    }
  }
};
