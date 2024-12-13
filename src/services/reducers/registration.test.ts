import {
  initialStateOfRegistration,
  registrationReducer
} from './registration';
import {
  catchRegistrationRejected,
  makeRegistration,
  makeRegistrationRequest,
  TRegistrationActions
} from '../actions/registration';
import { Response } from '../../shared/models/response.type';

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
      registrationReducer(
        initialStateOfRegistration,
        {} as TRegistrationActions
      )
    ).toEqual(initialStateOfRegistration);
  });

  it('should get registration', () => {
    expect(
      registrationReducer(
        initialStateOfRegistration,
        makeRegistration(testResponse)
      )
    ).toEqual({
      ...initialStateOfRegistration,
      response: testResponse
    });
  });

  it('should make registration request', () => {
    expect(
      registrationReducer(initialStateOfRegistration, makeRegistrationRequest())
    ).toEqual({
      ...initialStateOfRegistration,
      error: null
    });
  });

  it('should catch registration request', () => {
    expect(
      registrationReducer(
        initialStateOfRegistration,
        catchRegistrationRejected({
          error: 'error'
        })
      )
    ).toEqual({
      ...initialStateOfRegistration,
      error: {
        error: 'error'
      }
    });
  });
});
