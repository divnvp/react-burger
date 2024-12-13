import {
  RESET_PASSWORD_REJECTED,
  RESET_PASSWORD_REQUEST,
  RESETTING_PASSWORD
} from '../constants';
import { Response } from '../../shared/models/response.type';
import { TResetPasswordAction } from '../actions/reset-password';

type TResetPasswordState = {
  response?: Response;
  error: unknown;
  email: string;
};

export const initialStateOfResetPassword: TResetPasswordState = {
  error: null,
  email: ''
};

export const resetPasswordReducer = (
  state = initialStateOfResetPassword,
  action: TResetPasswordAction
): TResetPasswordState => {
  switch (action.type) {
    case RESETTING_PASSWORD: {
      return {
        ...state,
        response: action.response
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        error: null
      };
    }
    case RESET_PASSWORD_REJECTED: {
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
