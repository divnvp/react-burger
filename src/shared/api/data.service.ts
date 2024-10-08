import { Request } from '../consts/request.enum';
import { request } from '../utils/request';

const getData = () => {
  return request(`/ingredients`);
};

const makeOrder = (ingredients: string[]) => {
  return request(`/orders`, {
    method: Request.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients })
  });
};

export { getData, makeOrder };
