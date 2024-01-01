import Document, { Head, Html, Main, NextScript } from "next/document";
import scrolledScript from "../../lib/bootstrap/scrolledScript";
import modeScript from "../../lib/bootstrap/modeScript";

export default class _Document extends Document {
  render() {
    return (
      <Html lang="pt" className="h-full antialiased">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: scrolledScript }} />
          <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        </Head>
        <body className="ui-theme-default">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
