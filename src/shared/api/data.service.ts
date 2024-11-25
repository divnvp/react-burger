import { Request } from '../consts/request.enum';
import { request } from '../utils/request';
import { ResetPassword } from '../models/reset-password.type';
import { getCookie } from '../utils/get-cookie';

const getData = () => {
  return request(`/ingredients`);
};

const makeOrder = (ingredients: string[]) => {
  return request(`/orders`, {
    method: Request.POST,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken')!
    },
    body: JSON.stringify({ ingredients })
  });
};

const rememberPassword = (email: string) => {
  return request(`/password-reset`, {
    method: Request.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });
};

const resetPassword = (credits: ResetPassword) => {
  return request(`/password-reset/reset`, {
    method: Request.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credits)
  });
};

export { getData, makeOrder, rememberPassword, resetPassword };
