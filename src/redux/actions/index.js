// Coloque aqui suas actions
import * as types from './actionTypes';

const saveUser = (email) => ({
  type: types.SAVE_USER,
  email,
});

export default saveUser;
