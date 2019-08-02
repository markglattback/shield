import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

function create(initialState, { cookies }) {
  // initialState is the cache data returned from Apollo's getDataFromTree
  const isBrowser = typeof window !== 'undefined';
  const cache = new InMemoryCache().restore(initialState || {});

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: ApolloLink.from([
      onError(({ operation, response, graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          // logout client on unauthenticated
          graphQLErrors.forEach((error) => {
            if (error.extensions.code === 'UNAUTHENTICATED') {
              // todo
            }
          });
        }
        if (networkError) {
          // todo
        }
      }),
      new ApolloLink((operation, forward) => {
        operation.setContext(({ headers }) => {
          if (!cookies) return { headers };

          return {
            headers: {
              ...headers,
              Cookie: cookies,
            },
          };
        });

        return forward(operation);
      }),
      new HttpLink({
        uri: 'http://localhost:1989/graphql',
        credentials: 'include',
        fetch: !isBrowser && fetch,
      }),
    ]),
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

export default function initApollo(initialState, options = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (typeof window === 'undefined') {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
