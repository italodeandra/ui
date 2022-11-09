import { setCookie } from "cookies-next";
import { snapshot, subscribe } from "valtio";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function createStateHydration(options: { [key: string]: any }) {
  const firstKey = Object.keys(options)[0];

  const state = options[firstKey];

  subscribe(state, () => {
    setCookie(firstKey, snapshot(state));
  });

  return function hydrate(cookies: { state?: string }) {
    if (!cookies) {
      throw Error("This page is missing the cookies for hydration");
    }
    if (cookies[firstKey as keyof typeof cookies]) {
      Object.assign(
        state,
        JSON.parse(cookies[firstKey as keyof typeof cookies] as string)
      );
    }
  };
}
