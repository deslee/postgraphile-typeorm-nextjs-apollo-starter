import * as React from 'react';
import App, { Container, NextAppContext } from 'next/app'
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloLink } from 'apollo-boost';
import { AuthUser, AuthUserProvider, UpdateAuthUser } from '../lib/auth';
import { AUTH_USER_KEY } from '../lib/constants';
import { createHttpLink } from 'apollo-link-http';
import { NextContext } from 'next';
import Head from 'next/head';

interface Props {
    apolloState: any,
    link: ApolloLink,
    apolloClient?: ApolloClient<NormalizedCacheObject>,
    initialUser?: AuthUser
}

interface State {
    user?: AuthUser
}

let initialUserBrowser: AuthUser | undefined;
if (process.browser) {
    try {
        const parsed = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || 'false');
        if (parsed) {
            initialUserBrowser = parsed as AuthUser;
        }
    } catch (e) {
        console.log("json parsing error: ")
        console.error(e);
        localStorage.removeItem(AUTH_USER_KEY);
    }
}

class MyApp extends App<Props, State> {
    state = {
        user: this.props.initialUser || initialUserBrowser
    }

    static async getInitialProps({ Component, ctx }: NextAppContext) {
        let pageProps = {}
        let apolloState: any = undefined;
        let apolloClient: ApolloClient<NormalizedCacheObject> | undefined = undefined;
        let link: ApolloLink | undefined = undefined;

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        if (process.browser) {

        }
        else { // (!process.browser) {
            link = (ctx && ctx.req as any).link
            // TODO: determine initial user from req

            apolloClient = new ApolloClient({
                connectToDevTools: false,
                ssrMode: true, // Disables forceFetch on the server (so queries are only run once)
                link: link,
                cache: new InMemoryCache().restore({})
            })

            try {
                // Run all GraphQL queries
                await getDataFromTree(
                    <ApolloProvider client={apolloClient}>
                        <Container>
                            <Component {...pageProps}></Component>
                        </Container>
                    </ApolloProvider>
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
            apolloState = apolloClient.cache.extract()
        }

        return {
            pageProps,
            apolloState,
            link,
            initialUser: initialUserBrowser
        }
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

    render() {
        const { Component, pageProps, apolloClient, apolloState, link } = this.props;
        const { user } = this.state
        return <AuthUserProvider value={{ user, updateUser: this.updateUser }}>
            <ApolloProvider client={apolloClient ? apolloClient : new ApolloClient({
                connectToDevTools: process.browser,
                ssrMode: !process.browser,
                link: process.browser ? createHttpLink({
                    uri: '/graphql',
                    headers: {
                        'Authorization': Boolean(user) && user!.token ? `Bearer ${user!.token}` : ''
                    }
                }) : link,
                cache: new InMemoryCache().restore(/*apolloState || */{})
            })}>
                <Container>
                    <Component {...pageProps} />
                </Container>
            </ApolloProvider>
        </AuthUserProvider>
    }
}

export default (MyApp);