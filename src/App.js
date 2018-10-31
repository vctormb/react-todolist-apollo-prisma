import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// screens
import Todo from './screens/Todo';

import Login from './screens/Login';
class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Login} />
          <Route exact path="/todo" component={Todo} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
