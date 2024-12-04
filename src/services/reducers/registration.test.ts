import { registrationReducer } from './registration';
import {
  catchRegistrationRejected,
  makeRegistration,
  makeRegistrationRequest,
  TRegistrationActions
} from '../actions/registration';
import { Response } from '../../shared/models/response.type';

const initialState = {
  error: null
};

const testResponse: Response = {
  success: true,
  user: {
    email: 'a@a.ru',
    password: 'a',
    name: 'a'
  }
};

describe('Registration reducer', () => {
  it('should return initial state', () => {
    expect(
      registrationReducer(initialState, {} as TRegistrationActions)
    ).toEqual(initialState);
  });

  it('should get registration', () => {
    expect(
      registrationReducer(initialState, makeRegistration(testResponse))
    ).toEqual({
      ...initialState,
      response: testResponse
    });
  });

  it('should make registration request', () => {
    expect(
      registrationReducer(initialState, makeRegistrationRequest())
    ).toEqual({
      ...initialState,
      error: null
    });
  });

  it('should catch registration request', () => {
    expect(
      registrationReducer(
        initialState,
        catchRegistrationRejected({
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
