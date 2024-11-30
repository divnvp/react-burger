import {
  CHECKING_AUTH,
  LOGIN,
  LOGIN_REJECTED,
  LOGIN_REQUEST,
  LOGOUT,
  LOGOUT_REJECTED,
  LOGOUT_REQUEST
} from '../constants';
import { LoginUser } from '../../shared/models/login-user.type';
import { Response } from '../../shared/models/response.type';
import { TLoginActions } from '../actions/login';

type TLoginState = {
  error: unknown;
  accessToken?: string;
  refreshToken?: string;
  success: boolean;
  user?: LoginUser;
  logout?: Response | null;
  checkingAuth?: boolean;
};

const initialState: TLoginState = {
  error: null,
  accessToken: '',
  refreshToken: '',
  success: false,
  user: {
    email: '',
    name: '',
    password: ''
  },
  logout: null,
  checkingAuth: false
};

export const loginReducer = (
  state = initialState,
  action: TLoginActions
): TLoginState => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        logout: null,
        user: action.response?.user,
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
      return {
        ...state,
        error: action?.error
      };
    }

    case LOGOUT: {
      return {
        ...state,
        logout: action?.response,
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
