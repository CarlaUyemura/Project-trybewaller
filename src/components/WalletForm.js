import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        WalletForm
        <form>
          <label htmlFor="value">
            Valor
            <input
              id="value"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              id="description"
              data-testid="description-input"
            />
          </label>
          <select
            id="coin"
            data-testid="currency-input"
          >

            {
              currencies
                .map((elem, index) => <option key={ index }>{elem}</option>)

            }
          </select>
          <select
            id="method"
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            id="tag"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
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
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
