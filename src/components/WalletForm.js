import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApi, fetchExpense } from '../redux/actions';

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

  render() {
    const { currencies, expenses } = this.props;
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
            expenses(this.state);
            this.setState((prev) => ({
              id: prev.id + 1,
              value: '',
              description: '',
              tag: 'Lazer',
              method: 'Dinheiro',
              currency: 'USD',
            }));
          } }
        >
          Adicionar despesa

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
  expenses: (state) => dispatch(fetchExpense(state)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  dataCoin: state.wallet.dataCoin,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
