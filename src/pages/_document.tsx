// noinspection HtmlRequiredTitleElement

import Document, { Head, Html, Main, NextScript } from "next/document";

// noinspection JSUnusedGlobalSymbols
export default class _Document extends Document {
  render() {
    return (
      <Html lang="pt" className="h-full antialiased">
        <Head />
        <body className="flex h-full flex-col">
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}
