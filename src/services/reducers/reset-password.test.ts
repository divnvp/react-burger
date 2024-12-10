import { resetPasswordReducer } from './reset-password';
import {
  catchResetPasswordThunk,
  makeResetPassword,
  makeResetPasswordRequest,
  TResetPasswordAction
} from '../actions/reset-password';
import { Response } from '../../shared/models/response.type';

const initialState = {
  error: null,
  email: ''
};
const testResponse: Response = {
  success: true
};

describe('Reset password reducer', () => {
  it('should return initial state', () => {
    expect(
      resetPasswordReducer(initialState, {} as TResetPasswordAction)
    ).toEqual(initialState);
  });

  it('should make request password', () => {
    expect(
      resetPasswordReducer(initialState, makeResetPassword(testResponse))
    ).toEqual({
      ...initialState,
      response: testResponse
    });
  });

  it('should get request password', () => {
    expect(
      resetPasswordReducer(initialState, makeResetPasswordRequest())
    ).toEqual({
      ...initialState,
      error: null
    });
  });

  it('should catch password request', () => {
    expect(
      resetPasswordReducer(
        initialState,
        catchResetPasswordThunk({
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
