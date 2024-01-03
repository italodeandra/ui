import { useCallback } from "react";
import { get } from "lodash";

export type Intl<T = string> = { [key: string]: Intl<T> | T };

export default function useTranslation<K extends string>(
  intl?: Intl,
  prePath?: string
) {
  return useCallback(
    (sentence: K, path?: string) => {
      return (
        (get(
          intl,
          [
            ...(prePath?.split(".") || []),
            ...(path?.split(".") || []),
            sentence,
          ].filter(Boolean)
        ) as string) || sentence
      );
    },
    [intl, prePath]
  );
}
