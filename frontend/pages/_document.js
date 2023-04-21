import Document, {Html, Main, Head, NextScript} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class ArtStoreDocument extends Document {
    static getInitialProps( { renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props =>  sheet.collectStyles(<App {...props} />));
        const styleTags =sheet.getStyleElement();
        return {...page, styleTags}
    }
    render() {
        return (
        <Html lang="en-GB">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
        )
    }
}