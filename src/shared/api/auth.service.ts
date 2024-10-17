import { request } from '../utils/request';
import { Request } from '../consts/request.enum';
import { RegisterUser } from '../models/register-user.type';
import { LoginUser } from '../models/login-user.type';

const loginUser = (credits: LoginUser) => {
  return request(`/auth/login`, {
    method: Request.POST,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(credits)
  });
};

const logout = (token: string) => {
  return request(`/auth/logout`, {
    method: Request.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });
};

const refreshToken = (token: string) => {
  return request(`/auth/token`, {
    method: Request.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });
};

const registerUser = (credits: RegisterUser) => {
  return request(`/auth/register`, {
    method: Request.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credits)
  });
};

export { registerUser, loginUser, logout, refreshToken };
