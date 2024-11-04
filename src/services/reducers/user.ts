import { ActionType } from '../../shared/models/action.type';
import { IS_USER_AUTH, USER_GETTING } from '../actions/user';

const initialState = {
  name: '',
  email: '',
  password: '',
  isAuth: false
};

type UserReducer = {
  payload: {
    name?: string;
    email?: string;
    password?: string;
  };
};

export const userReducer = (
  state = initialState,
  action: ActionType & UserReducer
) => {
  switch (action.type) {
    case USER_GETTING: {
      return {
        ...state,
        name: action.payload?.name,
        email: action.payload?.email,
        password: action.payload?.password
      };
    }
    case IS_USER_AUTH: {
      return {
        ...state,
        isAuth: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
