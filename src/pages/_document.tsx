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
        <body className="flex h-full flex-col bg-gray-100 dark:bg-zinc-900 dark:text-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
