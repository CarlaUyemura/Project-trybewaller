import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      Hello, TrybeWallet!
      <Switch>
        <Route
          path="/"
          render={
            (props) => <Login { ...props } />
          }
          exact
        />
        <Route
          path="/carteira"
          render={
            (props) => <Wallet { ...props } />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
