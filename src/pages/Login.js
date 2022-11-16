import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value }, () => this.verifyInput());
  };

  verifyInput = () => {
    const { password, email } = this.state;
    const six = 6;
    const verf = /\S+@\S+\.\S+/;
    if (password.length >= six && verf.test(email)) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  render() {
    const { buttonDisabled, email, password } = this.state;
    const { save, history } = this.props;
    return (
      <div>
        <div className="container-logo">
          <h1 className="title">TrybeWallet</h1>
          <img src="https://futureintermediacoes.com.br/wp-content/uploads/2018/01/carteira-contas-pagar.png" alt="logo-carteira" className="img-logo" />
        </div>
        <div className="box">
          <form>
            <span className="text-center">Login</span>
            <div className="input-container">

              <input
                type="email"
                id="email"
                // placeholder="Digite seu email"
                data-testid="email-input"
                value={ email }
                onChange={ this.handleChange }
              />
              <label htmlFor="email">
                {' '}
                Email
              </label>
            </div>
            <div className="input-container">

              <input
                type="password"
                id="password"
                // placeholder="Digite uma senha"
                data-testid="password-input"
                value={ password }
                onChange={ this.handleChange }
              />
              <label htmlFor="password">
                {' '}
                Password
              </label>
            </div>
            <button
              type="button"
              disabled={ buttonDisabled }
              onClick={ () => {
                save(email);
                history.push('/carteira');
              } }
              className="btn"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  saveUser: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  save: (payload) => dispatch(saveUser(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
