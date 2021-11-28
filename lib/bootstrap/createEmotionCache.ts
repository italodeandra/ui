import type { EmotionCache } from "@emotion/cache";
import createCache from "@emotion/cache";

export default function createEmotionCache(): EmotionCache {
  return createCache({ key: "css" });
}
