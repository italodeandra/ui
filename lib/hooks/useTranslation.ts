import { useCallback } from "react";
import { get } from "lodash";

type Intl<T> = { [key: string]: Intl<T> | T };

export default function useTranslation(intl?: Intl<string>) {
  return useCallback(
    (sentence: string, path?: string) => {
      return (
        (get(intl, [path, sentence].filter(Boolean).join(".")) as string) ||
        sentence
      );
    },
    [intl]
  );
}
