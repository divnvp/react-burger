import { RegisterUser } from './register-user.type';
import { Ingredient } from './ingredient.type';
import { Order } from './order.type';
import { Response } from './response.type';
import { Feed } from './feed.type';

export type ActionType = {
  type: string;
  order?: Order;
  error?: unknown;
  ingredients?: Ingredient[];
  email?: string;
  response?: Response;
  user?: RegisterUser;
  accessToken?: string;
  refreshToken?: string;
  logout?: Response;
  checkingAuth?: boolean;
  isAuth?: boolean;
  payload?: {
    error?: unknown;
    name?: string;
    email?: string;
    password?: string;
    data?: unknown;
    user?: RegisterUser;
    accessToken?: string;
    refreshToken?: string;
    checkingAuth?: boolean;
    ingredient?: Ingredient;
    burgerConstructor?: Ingredient[];
    loading?: boolean;
    logout?: Response;
    amount?: number;
    feeds?: Feed;
  };
};
