import type { EmotionCache } from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
import type { AppInitialProps } from "next/app";
import type {
  AppContextType,
  AppPropsType,
  DocumentContext,
  NextComponentType,
} from "next/dist/shared/lib/utils";
// eslint-disable-next-line @next/next/no-document-import-in-page
import Document from "next/document";
import { Children } from "react";
import createEmotionCache from "./createEmotionCache";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp:
        (
          App: NextComponentType<
            AppContextType,
            AppInitialProps,
            AppPropsType & { emotionCache: EmotionCache }
          >
        ) =>
        (props) =>
          <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};

export default getInitialProps;
