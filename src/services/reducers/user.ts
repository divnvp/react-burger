import { ActionType } from '../../shared/models/action.type';
import { IS_USER_AUTH, USER_GETTING } from '../constants';

const initialState = {
  name: '',
  email: '',
  password: '',
  isAuth: false
};

export const userReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case USER_GETTING: {
      console.log(action);
      return {
        ...state,
        name: action.user?.name,
        email: action.user?.email,
        password: action.user?.password
      };
    }
    case IS_USER_AUTH: {
      console.log(action);
      return {
        ...state,
        isAuth: action?.isAuth
      };
    }
    default: {
      return state;
    }
  }
};
