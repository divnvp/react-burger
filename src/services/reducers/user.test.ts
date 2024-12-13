import { initialStateOfUser, userReducer } from './user';
import { TUserActions } from '../actions/user';
import { getUser, isUserAuth } from '../actions/login';

const userTest = {
  email: 'a@a.ru',
  password: 'a',
  name: 'a'
};

describe('User reducer', () => {
  it('should return initial state', () => {
    expect(userReducer(initialStateOfUser, {} as TUserActions)).toEqual(
      initialStateOfUser
    );
  });

  it('should get user', () => {
    expect(userReducer(initialStateOfUser, getUser(userTest))).toEqual({
      ...initialStateOfUser,
      name: userTest.name,
      email: userTest.email,
      password: userTest.password
    });
  });

  it('should check user auth', () => {
    expect(userReducer(initialStateOfUser, isUserAuth(true))).toEqual({
      ...initialStateOfUser,
      isAuth: true
    });
  });
});
