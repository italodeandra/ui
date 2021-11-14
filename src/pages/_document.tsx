import { Head, Html, Main, NextScript } from "next/document";
import { lightTheme } from "../theme";

// noinspection HtmlRequiredTitleElement
const Document = () => (
  <Html lang="en">
    <Head>
      <meta content={lightTheme.palette.primary.main} name="theme-color" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin={""}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
