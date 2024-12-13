import {
  initialStateOfResetPassword,
  resetPasswordReducer
} from './reset-password';
import {
  catchResetPasswordThunk,
  makeResetPassword,
  makeResetPasswordRequest,
  TResetPasswordAction
} from '../actions/reset-password';
import { Response } from '../../shared/models/response.type';

const testResponse: Response = {
  success: true
};

describe('Reset password reducer', () => {
  it('should return initial state', () => {
    expect(
      resetPasswordReducer(
        initialStateOfResetPassword,
        {} as TResetPasswordAction
      )
    ).toEqual(initialStateOfResetPassword);
  });

  it('should make request password', () => {
    expect(
      resetPasswordReducer(
        initialStateOfResetPassword,
        makeResetPassword(testResponse)
      )
    ).toEqual({
      ...initialStateOfResetPassword,
      response: testResponse
    });
  });

  it('should get request password', () => {
    expect(
      resetPasswordReducer(
        initialStateOfResetPassword,
        makeResetPasswordRequest()
      )
    ).toEqual({
      ...initialStateOfResetPassword,
      error: null
    });
  });

  it('should catch password request', () => {
    expect(
      resetPasswordReducer(
        initialStateOfResetPassword,
        catchResetPasswordThunk({
          error: 'error'
        })
      )
    ).toEqual({
      ...initialStateOfResetPassword,
      error: {
        error: 'error'
      }
    });
  });
});
