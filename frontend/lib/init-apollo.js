import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

function create(initialState) {
  // initialState is the cache data returned from Apollo's getDataFromTree
  const isBrowser = typeof window !== 'undefined';
  const cache = new InMemoryCache().restore(initialState || {});

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: ApolloLink.from([
      onError(({ response, graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.log(response);
          // logout client on unauthenticated
        }
        if (networkError) {
          console.log(networkError);
          // todo
        }
      }),
      new HttpLink({
        uri: 'http://localhost:1989/graphql',
        credentials: 'include',
        fetch: !isBrowser && fetch,
      }),
    ]),
    cache,
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (typeof window === 'undefined') {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
