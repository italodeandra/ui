import { CacheProvider } from "@emotion/react";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import Fade from "@mui/material/Fade";
import { ThemeProvider } from "@mui/material/styles";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { VFC } from "react";
import AppProps from "../../lib/bootstrap/AppProps";
import createEmotionCache from "../../lib/bootstrap/createEmotionCache";
import NProgress from "../../lib/components/NProgress";
import Snackbar from "../../lib/components/Snackbar";
import packageJson from "../../package.json";
import { darkTheme, lightTheme } from "../theme";
import { useThemeModeOnApp } from "../theme.state";

const clientSideEmotionCache = createEmotionCache();

const App: VFC<AppProps> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  const mode = useThemeModeOnApp();

  // noinspection HtmlRequiredTitleElement
  return (
    <CacheProvider value={emotionCache}>
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
        <Snackbar />
        <NProgress />
        <Fade in>
          <div>
            <Component {...pageProps} />
          </div>
        </Fade>
      </ThemeProvider>
    </CacheProvider>
  );
};

// noinspection JSUnusedGlobalSymbols
export default App;
