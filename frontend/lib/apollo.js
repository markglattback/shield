import React, { useMemo } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import initApolloClient from './initApollo';

export default function withApollo(Page, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = useMemo(() => apolloClient || initApolloClient(apolloState), []);

    return (
      <ApolloProvider client={client}>
        <Page {...pageProps} />
      </ApolloProvider>
    );
  };

  

}