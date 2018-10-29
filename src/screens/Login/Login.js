import React from 'react';
import Cookies from 'universal-cookie';

// graphql
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const cookies = new Cookies();

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    if (cookies.get('token')) {
      this.props.history.push('/todo');
    }
  }

  handleSubmit = async (login, e) => {
    const { email, password } = this.state;

    e.preventDefault();

    if (!email || !password) return;

    this.setState({
      loading: true,
    });

    const { data } = await login({
      variables: { email, password },
    });

    cookies.set('token', data.login.token, { path: '/' });

    this.props.history.push('/todo');
  };

  handleInputChange = (inputName, value) => {
    this.setState({
      [inputName]: value,
    });
  };

  render() {
    return (
      <Mutation mutation={LOGIN_MUTATION} errorPolicy="all">
        {(login, { loading, error }) => (
          <form onSubmit={e => this.handleSubmit(login, e)}>
            {error
              ? error.graphQLErrors.map(({ message }, i) => (
                  <p key={i}>{message}</p>
                ))
              : null}
            <input
              placeholder="email"
              type="email"
              onChange={e => this.handleInputChange('email', e.target.value)}
              value={this.state.email}
            />
            <br />
            <input
              placeholder="password"
              type="password"
              onChange={e => this.handleInputChange('password', e.target.value)}
              value={this.state.password}
            />
            <br />
            <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default Login;
