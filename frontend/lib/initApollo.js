import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-unfetch';

import { api } from '../config.json';

let apolloClient;

function createApolloClient(initialState = {}, options = {}) {
  const ssrMode = typeof window === 'undefined';
  
  const cache = new InMemoryCache().restore(initialState);
  
  const onErrorLink = onError(({ operation, response, graphQLErrors, networkError }) => {
    if (graphQLErrors) console.log('graphQLErrors: ', graphQLErrors);
    if (networkError) console.log('networkError: ', networkError);
    console.log(operation, response);
  });
  
  const setCookiesLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => {
      if (!options.cookies) return { headers };

      return {
        headers: {
          ...headers,
          Cookie: cookies,
        },
      };
    });

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: api,
    credentials: 'include',
    fetch: ssrMode && fetch,
  });

  return new ApolloClient({
    connectToDevTools: !ssrMode,
    ssrMode,
    link: ApolloLink.from([
      onErrorLink,
      setCookiesLink,
      httpLink,
    ]),
    cache,
    defaultoptions: {
      query: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

export default function initApolloClient(initialState) {
  // if SSR create a new client
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // if on Browser re-use client if one already exists
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}
