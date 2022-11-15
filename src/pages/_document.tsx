import Document, { Head, Html, Main, NextScript } from "next/document";
import scrolledScript from "../../lib/bootstrap/scrolledScript";

export default class _Document extends Document {
  render() {
    return (
      <Html lang="pt" className="h-full antialiased">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: scrolledScript }} />
        </Head>
        <body className="flex h-full flex-col bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
