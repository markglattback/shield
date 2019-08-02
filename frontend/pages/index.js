import React, { Component } from 'react';
import Link from 'next/link';
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
      <Query
        query={GET_PERMISSIONS}
        fetchPolicy="cache-and-network"
        onError={this.props.onError}
      >
        {({ loading, error }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div>Welcome to Next.js!
              <Link href="/about">
                <a>about</a>
              </Link>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withAuth(Home);
