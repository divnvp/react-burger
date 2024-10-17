import { ActionType } from '../../shared/models/action.type';
import { USER_GETTING } from '../actions/user';

const initialState = {
  name: '',
  email: '',
  password: ''
};

export const userReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case USER_GETTING: {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password
      };
    }
    default: {
      return state;
    }
  }
};
