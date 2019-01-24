import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import Navbar from './components/universal/navbar';
import Homepage from './components/homepage';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import ResetPassword from './components/auth/resetPassword/resetPassword';
import ConfirmResetPassword from './components/auth/confirmResetPassword/confirmResetPassword';
import App from './components/app/app';
import reducers from './reducers';

import requireAuth from './components/hoc/requireAuth';
import noRequireAuth from './components/hoc/noRequireAuth';

import { AUTHENTICATED } from './actions/types';

import './app-styles.less';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const user = localStorage.getItem('user');

if(user) {
  store.dispatch({ type: AUTHENTICATED });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/main" component={requireAuth(Homepage)} />
          <Route path="/signin" component={noRequireAuth(Signin)} />
          <Route path="/signup" component={noRequireAuth(Signup)} />
          <Route path="/reset-password" component={noRequireAuth(ResetPassword)} />
          <Route path="/confirm-reset-password/:id" component={noRequireAuth(ConfirmResetPassword)} />
          <Route path="/signout" component={requireAuth(Signout)} />
          <Route path="/app" component={requireAuth(App)} />
          <Route component={requireAuth(Homepage)} />
        </Switch>
      </div>
    </Router>
  </Provider>
, document.querySelector('.app-root'));
