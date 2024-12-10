import { loginReducer } from './login';
import {
  catchLoginRejected,
  catchLogoutRejected,
  checkAuth,
  getLogin,
  makeLoginRequest,
  makeLogout,
  makeRequestOfLogin,
  TLoginActions
} from '../actions/login';

const initialState = {
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
const testResponse = {
  success: true,
  user: {
    email: 'a@a.ru',
    name: 'a',
    password: 'a'
  },
  accessToken: 'a',
  refreshToken: 'a',
  checkingAuth: true,
  logout: null
};

describe('Login reducer', () => {
  it('should return initial state', () => {
    expect(loginReducer(initialState, {} as TLoginActions)).toEqual(
      initialState
    );
  });

  it('should make login', () => {
    expect(loginReducer(initialState, getLogin(testResponse))).toEqual({
      ...initialState,
      accessToken: 'a',
      checkingAuth: true,
      logout: null,
      refreshToken: 'a',
      success: true,
      user: testResponse.user
    });
  });

  it('should make login request', () => {
    expect(loginReducer(initialState, makeRequestOfLogin())).toEqual({
      ...initialState,
      error: null
    });
  });

  it('should catch login request', () => {
    expect(
      loginReducer(
        initialState,
        catchLoginRejected({
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

  it('should make logout', () => {
    expect(loginReducer(initialState, makeLogout(testResponse))).toEqual({
      ...initialState,
      logout: testResponse,
      checkingAuth: false
    });
  });

  it('should make logout request', () => {
    expect(loginReducer(initialState, makeLoginRequest())).toEqual({
      ...initialState,
      error: null
    });
  });

  it('should catch logout request', () => {
    expect(
      loginReducer(initialState, catchLogoutRejected({ error: 'error' }))
    ).toEqual({
      ...initialState,
      error: {
        error: 'error'
      }
    });
  });

  it('should checking auth', () => {
    expect(loginReducer(initialState, checkAuth(true))).toEqual({
      ...initialState,
      checkingAuth: true
    });
  });
});
