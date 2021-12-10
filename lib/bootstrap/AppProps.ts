import type { EmotionCache } from "@emotion/cache";
import type { AppProps as NextAppProps } from "next/app";
import GetLayout from "./GetLayout";

type AppProps = NextAppProps & {
  emotionCache: EmotionCache;
  Component: NextAppProps["Component"] & GetLayout;
};

export default AppProps;
