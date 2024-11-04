import { request } from '../utils/request';
import { Request } from '../consts/request.enum';
import { getCookie } from '../utils/get-cookie';
import { RegisterUser } from '../models/register-user.type';

const getUser = () => {
  return request(`/auth/user`, {
    method: Request.GET,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken')!
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
};

const updateUser = (credits: RegisterUser) => {
  return request(`/auth/user`, {
    method: Request.PATCH,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken')!
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(credits)
  });
};

export { getUser, updateUser };
