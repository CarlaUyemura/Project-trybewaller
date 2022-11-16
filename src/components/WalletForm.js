import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApi, fetchExpense, changeButton } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'USD',
    };
  }

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };

  newExpenseEdit = () => {
    const { expensesFetch, edit, changeButtonDisp, editExpense } = this.props;
    const {
      value,
      description,
      tag,
      method,
      currency,
    } = this.state;
    if (edit) {
      const newObj = {
        id: editExpense.id,
        value,
        description,
        currency,
        method,
        tag,
      };
      expensesFetch(newObj);
    } else {
      expensesFetch(this.state);
      changeButtonDisp();
    }
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',
      tag: 'Lazer',
      method: 'Dinheiro',
      currency: 'USD',
    }));
  }

  render() {
    const { currencies, edit } = this.props;
    const { value, description, tag, method, currency } = this.state;
    return (
      <div>
        <section className="container-input-wallet">

          <label htmlFor="value">
            <input
              id="value"
              type="number"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
              step=",01"
              placeholder="Digite o valor da despesa"
              className="input-wallet"
            />
          </label>
          <label htmlFor="description">
            <input
              id="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
              placeholder="Digite a descrição"
              className="input-wallet"
            />
          </label>
          <select
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
            className="input-wallet"
          >

            {
              currencies
                .map((elem, index) => (
                  <option
                    key={ index }
                    value={ elem }
                  >
                    {elem}
                  </option>
                ))

            }
          </select>
          <select
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
            className="input-wallet"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
            className="input-wallet"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button
            type="button"
            className="btn-add"
            onClick={
              this.newExpenseEdit
            }
          >
            {edit ? ['Editar despesa'] : 'Adicionar despesa'}

          </button>
        </section>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    filter: PropTypes.func,
  }),
  fetch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchApi()),
  expensesFetch: (state) => dispatch(fetchExpense(state)),
  changeButtonDisp: (expenses, editExpense) => dispatch(
    changeButton(expenses, editExpense),
  ),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  dataCoin: state.wallet.dataCoin,
  edit: state.wallet.edit,
  editExpense: state.wallet.editExpense,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
