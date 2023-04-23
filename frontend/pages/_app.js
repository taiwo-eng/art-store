import NProgress from 'nprogress';
import Router from 'next/router';
import Page from "../components/Page";
import '../components/styles/nprogress.css';
import {ApolloProvider} from '@apollo/client';
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function ArtStoreApp({ Component, pageProps, apollo}) {
    return (
        <ApolloProvider client={apollo}>
            <Page>
            <Component {...pageProps}>
            </Component>
        </Page>
        </ApolloProvider>
    )
}

ArtStoreApp.getInitialProps = async function ( { Component, ctx}) {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    };
    pageProps.query = ctx.query;
    return {pageProps};
}

export default withData(ArtStoreApp)