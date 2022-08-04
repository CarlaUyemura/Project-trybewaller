import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux, renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import Header from '../components/Header';
import { mockData } from '../../cypress/mocks/data';
import WalletForm from '../components/WalletForm';

describe('Testa o componente Wallet', () => {
  test('Verifica se as informações do header são renderizada corretamente', () => {
    const initialState = {
      user: {
        email: 'teste@trybe.com'
        }
      }
    renderWithRedux(<Header />, {initialState})

    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('teste@trybe.com');

    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0.00')

    const typeCoin = screen.getByTestId('header-currency-field');
    expect(typeCoin).toBeInTheDocument();
    expect(typeCoin).toHaveTextContent('BRL');
  })
  test('Verifica os dados do formulario são renderizado corretamente', () => {
    const mockCoins = Object.keys(mockData).filter((e) => e !== 'USDT');
   
    const initialState = {
      wallet: {
        currencies: mockCoins,
        expenses: [],
      }
    }
    renderWithRedux(<WalletForm />, {initialState})

    const value = screen.getByRole('spinbutton', {name: /valor/i })
    expect(value).toBeInTheDocument();

    const description = screen.getByRole('textbox', {name: /descrição/i})
    expect(description).toBeInTheDocument();
    
    const currency = screen.getByTestId("currency-input");
    userEvent.selectOptions(currency, 'USD');
    expect(currency).toBeInTheDocument();
    expect(currency).toHaveValue('USD');
    userEvent.selectOptions(currency, 'EUR');
    expect(currency).toHaveValue('EUR');

    const method = screen.getAllByRole("combobox")[1];
    expect(method).toBeInTheDocument();
    expect(method).toHaveValue('Dinheiro');
    userEvent.selectOptions(method, 'Cartão de crédito');
    expect(method).toHaveValue('Cartão de crédito');

    const tag = screen.getAllByRole("combobox")[2];
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveValue('Alimentação');
    userEvent.selectOptions(tag, 'Lazer');
    expect(tag).toHaveValue('Lazer');

    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i })
    expect(buttonAdd).toBeInTheDocument()
  });

  test('Verifica a tabela é renderizada com os dados corretos', async () => {
    const mockCoins = Object.keys(mockData).filter((e) => e !== 'USDT');
   
    const initialState = {
      wallet: {
        currencies: mockCoins,
        expenses: [],
      }
    }
    renderWithRedux(<Wallet />, {initialState})
    
    const titles = ['Descrição', 'Tag', 'Método de pagamento','Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir']
    titles.map((e) => expect(screen.getByRole('columnheader', { name: e })).toBeInTheDocument())
    const value = screen.getByRole('spinbutton', {name: /valor/i })
    userEvent.type(value, 10)

    const description = screen.getByRole('textbox', {name: /descrição/i})
    userEvent.type(description, 'lanche')
    
    const currency = screen.getByTestId("currency-input");
    userEvent.selectOptions(currency, 'USD');

    const method = screen.getAllByRole("combobox")[1];
    userEvent.selectOptions(method, 'Cartão de crédito');

    const tag = screen.getAllByRole("combobox")[2];
    userEvent.selectOptions(tag, 'Lazer');

    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i })
    userEvent.click(buttonAdd);

    const food = await screen.findByText('lanche')
    expect(food).toBeInTheDocument()

  })
  test('Verifica se o botão de editar funcionam corretamente', async () => {
    const mockCoins = Object.keys(mockData).filter((e) => e !== 'USDT');
   
    const initialState = {
      wallet: {
        currencies: mockCoins,
        expenses: [
          {
          id:0,
          value:"10",
          description:"Lanche",
          tag:"Alimentação",
          method:"Dinheiro",
          currency:"USD",
          exchangeRates: mockData,
        },
        {
          id:1,
          value:"50",
          description:"Jantar",
          currency:"USD",
          method:"Cartão de crédito",
          tag:"Alimentação",
          exchangeRates: mockData,
        },
        {
          id:2,
          value:"100",
          description:"Games",
          tag:"Lazer",
          method:"Dinheiro",
          currency:"USD",
          exchangeRates: mockData,
        }
        ],
      }
    }
    renderWithRedux(<Wallet />, {initialState})

    const buttonEdit = screen.getAllByRole('button', { name: /editar/i });
  
    const expense1 = screen.getByText(/jantar/i) 
    userEvent.click(buttonEdit[1]);
  
    expect(expense1).not.toBeInTheDocument();

    const value = screen.getByRole('spinbutton', {name: /valor/i })
    userEvent.type(value, 30)

    const description = screen.getByRole('textbox', {name: /descrição/i})
    userEvent.type(description, 'Fone')
    
    const currency = screen.getByTestId("currency-input");
    userEvent.selectOptions(currency, 'EUR');

    const method = screen.getAllByRole("combobox")[1];
    userEvent.selectOptions(method, 'Cartão de crédito');

    const tag = screen.getAllByRole("combobox")[2];
    userEvent.selectOptions(tag, 'Trabalho');


    const buttonEditExpense = screen.getByRole('button', { name: /editar despesa/i });
    expect(buttonEditExpense).toBeInTheDocument();
    userEvent.click(buttonEditExpense);

    const item = await screen.findByText('Fone')
    expect(item).toBeInTheDocument()
    expect(buttonEdit[1]).toHaveAttribute('id', '1')
  })
  test('Verifica se o botão excluir funciona corretamente', () => {
    const mockCoins = Object.keys(mockData).filter((e) => e !== 'USDT');
    const initialState= {
      wallet: {
        currencies: mockCoins,
        expenses: [
          {
          id:0,
          value:"10",
          description:"Lanche",
          tag:"Alimentação",
          method:"Dinheiro",
          currency:"USD",
          exchangeRates: mockData,
        },
        {
          id:1,
          value:"50",
          description:"Jantar",
          currency:"USD",
          method:"Cartão de crédito",
          tag:"Alimentação",
          exchangeRates: mockData,
        }
      
      ]
    }
  }
  renderWithRedux(<Wallet />, {initialState});
  const total = screen.getByTestId("total-field");
  expect(total).toHaveTextContent('285.19')
  const buttonExcluir = screen.getAllByRole('button', { name: /excluir/i });
  const foodLanche = screen.getByText('Lanche');
  const foodJantar = screen.getByText('Jantar')
  expect(buttonExcluir).toHaveLength(2);

  userEvent.click(buttonExcluir[0]);
  expect(foodLanche).not.toBeInTheDocument();
  expect(total).toHaveTextContent('237.66')
  userEvent.click(buttonExcluir[1]);
  expect(total).toHaveTextContent('0.00')
  expect(foodJantar).not.toBeInTheDocument();
  screen.logTestingPlaygroundURL();
  });
});