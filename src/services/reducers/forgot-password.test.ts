import {
  catchErrorOfForgotPassword,
  makeRequestOfForgotPassword,
  sendEmail,
  TForgotPasswordActions
} from '../actions/forgot-password';
import {
  forgotPasswordReducer,
  initialStateOfForgotPassword
} from './forgot-password';
import { Response } from '../../shared/models/response.type';

const testResponse: Response = {
  success: true
};

describe('Forgot password reducer', () => {
  it('should return initial state', () => {
    expect(
      forgotPasswordReducer(
        initialStateOfForgotPassword,
        {} as TForgotPasswordActions
      )
    ).toEqual(initialStateOfForgotPassword);
  });

  it('should send email', () => {
    expect(
      forgotPasswordReducer(
        initialStateOfForgotPassword,
        sendEmail(testResponse)
      )
    ).toEqual({
      ...initialStateOfForgotPassword,
      response: testResponse
    });
  });

  it('should request password', () => {
    expect(
      forgotPasswordReducer(
        initialStateOfForgotPassword,
        makeRequestOfForgotPassword('a@a.ru')
      )
    ).toEqual({
      ...initialStateOfForgotPassword,
      email: 'a@a.ru'
    });
  });

  it('should catch error forgot password', () => {
    expect(
      forgotPasswordReducer(
        initialStateOfForgotPassword,
        catchErrorOfForgotPassword({
          error: 'error'
        })
      )
    ).toEqual({
      ...initialStateOfForgotPassword,
      error: {
        error: 'error'
      }
    });
  });
});
