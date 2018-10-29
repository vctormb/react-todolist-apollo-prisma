import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './screens/Login';
class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Login} />
          <Route exact path="/todo" component={() => <div>todo</div>} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
