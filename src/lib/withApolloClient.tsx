import * as React from 'react'
import { AUTH_USER_KEY } from './constants';
import initApollo from './init-apollo'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'
import { AuthUserProvider, UpdateAuthUser, AuthUser, AuthUserContext } from './auth'
import { default as NextApp, NextAppContext, DefaultAppIProps } from 'next/app';

interface State {
  user?: AuthUser
}

let initialUser: AuthUser | undefined;
if (process.browser) {
  try {
    const parsed = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || 'false');
    if (parsed) {
      initialUser = parsed as AuthUser;
    }
  } catch (e) {
    console.log("json parsing error: ")
    console.error(e);
    localStorage.removeItem(AUTH_USER_KEY);
  }
}

export default (App: any) => {
  return class Apollo extends React.Component<any, State> {
    static displayName = 'withApollo(App)'

    static async getInitialProps(ctx: NextAppContext) {
      const { Component, router } = ctx

      let appProps: any = {
        pageProps: undefined
      };
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      let apolloState: any = undefined;

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const link = (ctx.ctx && ctx.ctx.req as any).link
        const apollo = initApollo(undefined, undefined, link)
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        // Extract query data from the Apollo store
        apolloState = apollo.cache.extract()
      }

      return {
        ...appProps,
        apolloState,
      }
    }

    state = {
      user: initialUser
    }

    updateUser: UpdateAuthUser = (user: AuthUser) => {
      if (process.browser) {
        if (user) {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(AUTH_USER_KEY);
        }
      }
      this.setState({
        user
      });

    }

    constructor(props: any) {
      super(props)
    }

    render() {
      const { apolloState, link } = this.props;
      const { user } = this.state;

      const client = initApollo(apolloState, user, link)

      return <AuthUserProvider value={{ user, updateUser: this.updateUser }}>
        <App {...this.props} apolloClient={client} />
      </AuthUserProvider>
    }
  }
}