import type { EmotionCache } from "@emotion/cache";
import type { AppProps as NextAppProps } from "next/app";

type AppProps = NextAppProps & { emotionCache: EmotionCache };

export default AppProps;
