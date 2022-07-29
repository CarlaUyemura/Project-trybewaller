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
        Login
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Digite seu email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            placeholder="Digite uma senha"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ () => {
            save(email);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
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
