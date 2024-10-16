import { request } from '../utils/request';
import { Request } from '../consts/request.enum';
import { RegisterUser } from '../models/register-user.type';

const registerUser = (credits: RegisterUser) => {
  return request(`/auth/register`, {
    method: Request.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ credits })
  });
};

export { registerUser };
