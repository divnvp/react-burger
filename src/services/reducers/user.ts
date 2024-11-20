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
      return {
        ...state,
        name: action.payload?.name,
        email: action.payload?.email,
        password: action.payload?.password
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
