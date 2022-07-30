import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
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
                      <button type="button">Excluir</button>
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

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
