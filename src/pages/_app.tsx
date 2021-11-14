import { CssBaseline, Fade, ThemeProvider } from "@mui/material";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import { VFC } from "react";
import packageJson from "../../package.json";
import { darkTheme, lightTheme } from "../theme";
import { useThemeModeOnApp } from "../theme.state";

const App: VFC<AppProps> = ({ Component, pageProps }) => {
  const mode = useThemeModeOnApp();

  // noinspection HtmlRequiredTitleElement
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s - ${packageJson.name}`}
        defaultTitle={packageJson.name}
        description={packageJson.description}
      />
      <Head>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <Fade in>
          <div>
            <Component {...pageProps} />
          </div>
        </Fade>
      </ThemeProvider>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default App;
