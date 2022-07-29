// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  const { REQUEST_COIN_SUCESS, REQUEST_COIN_FAILURE } = types;
  switch (action.type) {
  case REQUEST_COIN_SUCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case REQUEST_COIN_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
