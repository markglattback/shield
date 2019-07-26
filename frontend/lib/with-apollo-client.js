import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import initApollo from './init-apollo';

export default App => class Apollo extends React.Component {
  static displayName = 'withApollo(App)';
    
  constructor(props) {
    // called after getInitalProps
    super(props);
    this.apolloClient = initApollo(props.apolloState);
  }

  static async getInitialProps(ctx) {
    const { Component, router } = ctx;

    // Get initial props for _app.js
    let appProps = {};
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(ctx);
    }

    // Run all GraphQL queries in the component tree
    // and extract data to populate apollo cache
    const apollo = initApollo();
    if (typeof window === 'undefined') {
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloClient={apollo}
          />,
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop or in onError link
        console.error('Error while running `getDataFromTree`', error);
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind();
    }

    // Extract query data from the Apollo store
    const apolloState = apollo.cache.extract();

    return {
      ...appProps,
      apolloState,
    };
  }
  
  render() {
    return <App {...this.props} apolloClient={this.apolloClient} />;
  }
};
