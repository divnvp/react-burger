import {
  catchErrorOfForgotPassword,
  makeRequestOfForgotPassword,
  sendEmail,
  TForgotPasswordActions
} from '../actions/forgot-password';
import { forgotPasswordReducer } from './forgot-password';
import { Response } from '../../shared/models/response.type';

const initialState = {
  error: null,
  email: ''
};
const testResponse: Response = {
  success: true
};

describe('Forgot password reducer', () => {
  it('should return initial state', () => {
    expect(
      forgotPasswordReducer(initialState, {} as TForgotPasswordActions)
    ).toEqual(initialState);
  });

  it('should send email', () => {
    expect(
      forgotPasswordReducer(initialState, sendEmail(testResponse))
    ).toEqual({
      ...initialState,
      response: testResponse
    });
  });

  it('should request password', () => {
    expect(
      forgotPasswordReducer(initialState, makeRequestOfForgotPassword('a@a.ru'))
    ).toEqual({
      ...initialState,
      email: 'a@a.ru'
    });
  });

  it('should catch error forgot password', () => {
    expect(
      forgotPasswordReducer(
        initialState,
        catchErrorOfForgotPassword({
          error: 'error'
        })
      )
    ).toEqual({
      ...initialState,
      error: {
        error: 'error'
      }
    });
  });
});
