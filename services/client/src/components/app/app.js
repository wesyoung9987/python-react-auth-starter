import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Dashboard from './dashboard/dashboard';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <Switch>
          <Redirect from={`${this.props.match.url}`} exact to={`${this.props.match.url}/dashboard`}/>
          <Route path={`${this.props.match.url}/dashboard`} component={Dashboard} />
        </Switch>
      </div>
    );
  };
}

export default App;