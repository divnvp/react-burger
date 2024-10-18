import { request } from '../utils/request';
import { Request } from '../consts/request.enum';
import { getCookie } from '../utils/get-cookie';

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

const updateUser = (credits: any) => {
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
