import { userReducer } from './user';
import { TUserActions } from '../actions/user';
import { getUser, isUserAuth } from '../actions/login';

const initialState = {
  name: '',
  email: '',
  password: '',
  isAuth: false
};
const userTest = {
  email: 'a@a.ru',
  password: 'a',
  name: 'a'
};

describe('User reducer', () => {
  it('should return initial state', () => {
    expect(userReducer(initialState, {} as TUserActions)).toEqual(initialState);
  });

  it('should get user', () => {
    expect(userReducer(initialState, getUser(userTest))).toEqual({
      ...initialState,
      name: userTest.name,
      email: userTest.email,
      password: userTest.password
    });
  });

  it('should check user auth', () => {
    expect(userReducer(initialState, isUserAuth(true))).toEqual({
      ...initialState,
      isAuth: true
    });
  });
});
