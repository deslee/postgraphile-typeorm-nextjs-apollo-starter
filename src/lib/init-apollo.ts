import { ApolloClient, InMemoryCache } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import { createHttpLink } from 'apollo-link-http';
import { AuthUser } from './auth';

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  (global as any).fetch = fetch
}

function create(initialState?: any, user?: AuthUser, link?: any) {
  console.log(process.browser, link);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: process.browser ? createHttpLink({
      uri: '/graphql',
      headers: {
        'Authorization': Boolean(user) && user!.token ? `Bearer ${user!.token}` : ''
      }
    }) : link,
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState?: any, user?: AuthUser, link?: any) {
  return create(initialState, user, link)
  // // Make sure to create a new client for every server-side request so that data
  // // isn't shared between connections (which would be bad)
  // if (!process.browser) {
  //   return create(initialState)
  // }

  // // Reuse client on the client-side
  // if (!apolloClient) {
  //   return create(initialState)
  // }

  // return apolloClient
}