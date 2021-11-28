import Document, { Head, Html, Main, NextScript } from "next/document";
import getInitialProps from "../../lib/bootstrap/getInitialProps";
import { lightTheme } from "../theme";

class MyDocument extends Document {
  render(): JSX.Element {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={lightTheme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = getInitialProps;

// noinspection JSUnusedGlobalSymbols
export default MyDocument;
