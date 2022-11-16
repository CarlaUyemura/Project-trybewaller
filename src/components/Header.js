import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div className="container-header">
        <header>
          <h2 data-testid="email-field">
            {email}
          </h2>
          <div className="container-logo-header">
            <h1 className="title-header">TrybeWallet</h1>
            <img src="https://futureintermediacoes.com.br/wp-content/uploads/2018/01/carteira-contas-pagar.png" alt="logo-carteira" className="img-logo-header" />
          </div>
        </header>
        <div className="container-total">
          <h2 data-testid="total-field">
            {' '}
            Total das despesas: R$
            {

              expenses.value === 0 ? 0.00 : expenses.reduce((acc, cur) => {
                parseFloat(acc += (cur.exchangeRates[cur.currency].ask * cur.value));
                return acc;
              }, 0).toFixed(2)
            }

          </h2>
          <h2 data-testid="header-currency-field">BRL</h2>
          <img src="https://cdn-icons-png.flaticon.com/512/781/781760.png" alt="icon-despesa" className="icon-desp" />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
    value: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  editExpense: state.wallet.expenses,
  edit: state.wallet.edit,
});

export default connect(mapStateToProps, null)(Header);
