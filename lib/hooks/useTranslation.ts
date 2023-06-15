import { useCallback } from "react";
import { get } from "lodash";

export type Intl<T> = { [key: string]: Intl<T> | T };

export default function useTranslation(intl?: Intl<string>, prePath?: string) {
  return useCallback(
    (sentence: string, path?: string) => {
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
