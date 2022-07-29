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

export const requestCoinFailure = (error) => ({
  type: types.REQUEST_COIN_FAILURE,
  error,
});

export const fetchApi = () => async (dispatch) => {
  try {
    const response = await coinApi();
    dispatch(requestCoinSucess(response));
  } catch (error) {
    dispatch(requestCoinFailure(error));
  }
};
