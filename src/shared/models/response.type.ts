import { LoginUser } from './login-user.type';

export type Response = {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: LoginUser;
  error?: string;
};
