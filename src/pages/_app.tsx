import "@fontsource/inter/variable.css";
import "../../lib/bootstrap/supressConsoleLog";
import { MantineProvider } from "@mantine/core";
import { QueryClient } from "@tanstack/query-core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>@italodeandra/ui</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              // colorScheme: "dark",
              fontFamily:
                'InterVariable, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            }}
          >
            {getLayout(<Component {...pageProps} />)}
          </MantineProvider>
          <ReactQueryDevtools position={"bottom-right"} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

// noinspection JSUnusedGlobalSymbols
export default MyApp;
