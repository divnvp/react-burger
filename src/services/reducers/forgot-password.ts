import {
  FORGOT_PASSWORD_REJECTED,
  FORGOT_PASSWORD_REQUEST,
  SENDING_EMAIL
} from '../constants';
import { TForgotPasswordActions } from '../actions/forgot-password';
import { Response } from '../../shared/models/response.type';

type TForgotPasswordState = {
  error: unknown;
  response?: Response;
  email: string;
};

export const initialStateOfForgotPassword: TForgotPasswordState = {
  error: null,
  email: ''
};

export const forgotPasswordReducer = (
  state = initialStateOfForgotPassword,
  action: TForgotPasswordActions
): TForgotPasswordState => {
  switch (action.type) {
    case SENDING_EMAIL: {
      return {
        ...state,
        response: action?.response
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        error: null,
        email: action?.email
      };
    }
    case FORGOT_PASSWORD_REJECTED: {
      return {
        ...state,
        error: action?.error
      };
    }
    default: {
      return state;
    }
  }
};
