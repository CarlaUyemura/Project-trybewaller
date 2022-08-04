// Coloque aqui suas actions
import * as types from './actionTypes';
import coinApi from '../../service/coinApi';

export const saveUser = (email) => ({
  type: types.SAVE_USER,
  email,
});

export const requestCoinSucess = (currencies) => ({
  type: types.REQUEST_COIN_SUCESS,
  currencies,
});

export const saveExpenses = (expenses, response) => ({
  type: types.SAVE_EXPENSES,
  expenses,
  response,
});

export const deleteExpenses = (expenses) => ({
  type: types.DELETE_EXPENSES,
  expenses,
});

export const editExpenseAction = (expenses, editExpense) => ({
  type: types.EDIT_EXPENSE,
  expenses,
  editExpense,
});

export const changeButton = () => ({
  type: types.CHANGE_BUTTON,
  edit: false,
});

export const fetchApi = () => async (dispatch) => {
  const response = await coinApi();
  dispatch(requestCoinSucess(response));
};

export const fetchExpense = (state) => async (dispatch) => {
  const response = await coinApi();
  return dispatch(saveExpenses(state, response));
};
