// Esse reducer será responsável por tratar as informações da pessoa usuária
import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  const { SAVE_USER } = types;
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
