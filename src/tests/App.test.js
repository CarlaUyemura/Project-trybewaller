import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente Login', () => {
  test('Se existe o input de email, password e um button desabilitado com o texto Entrar', () => {
      renderWithRouterAndRedux(<App />);
      const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
      expect(inputEmail).toBeInTheDocument();
      const inputPassword = screen.getByPlaceholderText(/digite uma senha/i);
      expect(inputPassword).toBeInTheDocument();
      const button = screen.getByRole('button', { name: /entrar/i });
      expect(button).toBeDisabled();

  });
  test('Se o botão é ativado com o email válido e a senha maior que 6 dígitos e se ao clicar em entrar é redirecionado para pagina /carteira', () => {
    const {history} = renderWithRouterAndRedux(<App />);
    
    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    userEvent.type(inputEmail, 'teste@trybe.com')
    const inputPassword = screen.getByPlaceholderText(/digite uma senha/i);
    userEvent.type(inputPassword, '123456')
    expect(inputPassword).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeEnabled();
    userEvent.click(button)
    const {pathname} = history.location;
    expect(pathname).toBe('/carteira')
    screen.logTestingPlaygroundURL()
});
});