import { setCookie } from "cookies-next";
import { snapshot, subscribe } from "valtio";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function createStateHydration(cookieName: string, state: any) {
  subscribe(state, () => {
    setCookie(cookieName, snapshot(state));
  });

  return function hydrate(cookies?: { state?: string }) {
    if (cookies?.[cookieName as keyof typeof cookies]) {
      Object.assign(
        state,
        JSON.parse(cookies[cookieName as keyof typeof cookies] as string)
      );
    }
  };
}
