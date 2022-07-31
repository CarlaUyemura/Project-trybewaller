import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{email}</h2>
          <h2 data-testid="total-field">
            {

              expenses.value === 0 ? 0.00 : expenses.reduce((acc, cur) => {
                parseFloat(acc += (cur.exchangeRates[cur.currency].ask * cur.value));
                return acc;
              }, 0).toFixed(2)
            }

          </h2>
          <h2 data-testid="header-currency-field">BRL</h2>
        </header>
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
