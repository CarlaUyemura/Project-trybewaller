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
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses:
      [...state.expenses, { ...action.expenses, exchangeRates: action.response }],
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
      edit: false,
    };
  default:
    return state;
  }
};

export default wallet;
