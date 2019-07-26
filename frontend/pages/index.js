import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withAuth from '../lib/withAuth';

const GET_PERMISSIONS = gql`
  query GET_PERMISSIONS {
    GET_PERMISSIONS {
      id
      name
      roles
    }
  }
`;

class Home extends Component {
  render() {
    return (
      <Query query={GET_PERMISSIONS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          console.log(data);

          return (
            <div>Welcome to Next.js!</div>
          );
        }}
      </Query>
    );
  }
}

export default withAuth(Home);
