import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
// import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';
import withApollo from 'next-with-apollo';

const cache = new InMemoryCache();

const request = async (operation) => {
  // set custom headers in here
  console.log(operation);
};


const requestLink = new ApolloLink((operation, forward) => new Observable((observer) => {
  let handle;
  Promise.resolve(operation)
    .then(oper => request(oper))
    .then(() => {
      handle = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });
    })
    .catch(observer.error.bind(observer));

  return () => {
    if (handle) handle.unsubscribe();
  };
}));

function createClient({ ctx, headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ operation, response, graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          const [ error ] = graphQLErrors;
          // todo
        }
        if (networkError) {
          console.log(networkError);
          // todo
        }
      }),
      requestLink,
      new HttpLink({
        uri: 'http://localhost:1989/graphql',
        credentials: 'include',
      }),
    ]),
    cache,
    ssrMode: true,
  });
}

// Initial State

cache.writeData({
  data: {
    systemMessage: '',
    __typename: 'SystemMessage',
  },
});

export default withApollo(createClient);
