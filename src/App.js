import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

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
      </Switch>
    </div>);
}

export default App;
