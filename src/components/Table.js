import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions/index';

class Table extends Component {
  deleteAndDispatch = ({ target }) => {
    const { expenses, newExpenses } = this.props;
    const newArray = expenses.filter((expense) => (expense.id !== Number(target.id)))
      .map((expense) => expense);
    newExpenses(newArray);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        Table
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses
                .map(({
                  id,
                  description,
                  value,
                  currency,
                  method,
                  tag,
                  exchangeRates,
                }) => (
                  <tr key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{parseFloat(value).toFixed(2)}</td>
                    <td>{exchangeRates[currency].name}</td>
                    <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                    <td>
                      {
                        parseFloat(exchangeRates[currency].ask * value).toFixed(2)
                      }

                    </td>
                    <td>Real</td>
                    <td>
                      <button type="button">Editar</button>
                      <button
                        id={ id }
                        type="button"
                        data-testid="delete-btn"
                        onClick={ this.deleteAndDispatch }
                      >
                        Excluir

                      </button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    filter: PropTypes.func,
    map: PropTypes.func,
  }),
  newExpenses: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  newExpenses: (expenses) => dispatch(deleteExpenses(expenses)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);
