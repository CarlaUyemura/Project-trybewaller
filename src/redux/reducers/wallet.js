// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: '',
  edit: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  const {
    REQUEST_COIN_SUCESS,
    REQUEST_COIN_FAILURE,
    SAVE_EXPENSES,
    DELETE_EXPENSES,
    EDIT_EXPENSE,
    CHANGE_BUTTON,
  } = types;

  switch (action.type) {
  case REQUEST_COIN_SUCESS:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((coin) => coin !== 'USDT'),
    };
  case REQUEST_COIN_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses:
      [{ ...action.expenses, exchangeRates: action.response }, ...state.expenses],
    };

  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
      editExpense: action.editExpense,
      edit: true,
    };
  case CHANGE_BUTTON:
    return {
      ...state,
      // expenses: [...action.expenses, action.editExpense],
      edit: false,
    };
  default:
    return state;
  }
};

export default wallet;
