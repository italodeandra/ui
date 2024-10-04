import { setCookie } from "cookies-next";
import ms from "ms";
import { snapshot, subscribe } from "valtio";

export default function createStateHydration<T extends object>(
  cookieName: string,
  state: T,
  properties?: (keyof T)[],
) {
  subscribe(state, () => {
    setCookie(cookieName, snapshot(state), {
      maxAge: ms("30d"),
      path: "/",
    });
  });

  return function hydrate(cookies?: { state?: string }) {
    if (cookies?.[cookieName as keyof typeof cookies]) {
      try {
        const cookieValueString = cookies[
          cookieName as keyof typeof cookies
        ] as string;
        const cookieValue = JSON.parse(cookieValueString);
        if (typeof cookieValue === "object") {
          for (const property of properties || Object.keys(state)) {
            if (cookieValue[property]) {
              state[property as keyof typeof state] = cookieValue[property];
            }
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // do nothing
      }
    }
  };
}
