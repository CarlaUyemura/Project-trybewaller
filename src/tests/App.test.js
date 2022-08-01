import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
describe('Testa o componente Login', () => {
  test('Se existe o input de email, password e um button desabilitado com o texto Entrar', () => {
    renderWithRouterAndRedux(<App />);
      const inputEmail = screen.getByLabelText('Email:');
      expect(inputEmail).toBeInTheDocument();
      screen.logTestingPlaygroundURL()
  });

});