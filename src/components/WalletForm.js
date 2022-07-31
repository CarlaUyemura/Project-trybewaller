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

  teste = () => {
    const { editExpense } = this.props;
    this.setState({
      id: editExpense.id,
      value: editExpense.value,
      description: editExpense.description,
      tag: editExpense.tag,
      method: editExpense.method,
      currency: editExpense.currency,
    });
  }

  render() {
    const { currencies, expensesFetch, edit, changeButtonDisp } = this.props;
    const { value, description, tag, method, currency } = this.state;
    return (
      <div>
        WalletForm
        <form>
          <label htmlFor="value">
            Valor
            <input
              id="value"
              type="number"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
              step=",01"
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              id="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <select
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
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
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button
          type="button"
          onClick={ () => {
            expensesFetch(this.state);
            this.setState((prev) => ({
              id: prev.id + 1,
              value: '',
              description: '',
              tag: 'Lazer',
              method: 'Dinheiro',
              currency: 'USD',
            }));
            changeButtonDisp();
          } }
        >
          {edit ? ['Editar despesa'] : 'Adicionar despesa'}

        </button>
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
