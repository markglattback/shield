import React, { Component } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    LOGIN(email: $email, password: $password) {
      id
      firstName
      roles
    }
  }
`;

const GET_USER = gql`
  query GET_USER {
    id
    firstName
    roles
  }
`;

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [`${name}`]: value,
    });
  }

  render() {
    const { state: { email, password } } = this;

    return (
      <Mutation
        mutation={LOGIN}
        update={(cache, { data: { LOGIN: login } }) => {
          console.log(login);
          cache.writeQuery({
            query: GET_USER,
            data: login,
          });

          console.log(Router);
          Router.push('/');
        }}
      >
        {login => (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                login({ variables: { email, password } });
              }}
            >
              <input type="text" name="email" onChange={this.handleChange} value={email} />
              <input type="password" name="password" onChange={this.handleChange} value={password} />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
