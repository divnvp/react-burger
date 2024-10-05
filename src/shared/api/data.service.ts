import { Request } from '../consts/request.enum';

const apiUrl = 'https://norma.nomoreparties.space/api';

const getData = () => {
  return fetch(`${apiUrl}/ingredients`);
};

const makeOrder = (ingredients: string[]) => {
  return fetch(`${apiUrl}/orders`, {
    method: Request.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients })
  });
};

export { getData, makeOrder };
